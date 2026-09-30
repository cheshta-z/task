import {
  differenceInCalendarDays,
  format,
  isValid,
  parseISO,
  startOfDay,
} from "date-fns";

export type GoalStatus = "current" | "completed";

export interface Goal {
  id: string;
  title: string;
  endDate: string;
  status: GoalStatus;
}

export const STORAGE_KEY = "task-manager:goals:v1";

export function getStorageKey(): string {
  return STORAGE_KEY;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function generateGoalId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `goal-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function normalizeGoalTitle(value: string): string {
  return value.trim();
}

export function isValidDateValue(value: string): boolean {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) {
    return false;
  }

  const parsed = parseISO(value);
  return isValid(parsed);
}

export function sanitizeGoal(value: unknown): Goal | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const record = value as Partial<Goal>;

  if (
    typeof record.id !== "string" ||
    !record.id.trim() ||
    typeof record.title !== "string" ||
    !normalizeGoalTitle(record.title) ||
    typeof record.endDate !== "string" ||
    !isValidDateValue(record.endDate) ||
    (record.status !== "current" && record.status !== "completed")
  ) {
    return null;
  }

  return {
    id: record.id,
    title: normalizeGoalTitle(record.title),
    endDate: record.endDate,
    status: record.status,
  };
}

export function parseStoredGoals(value: unknown): Goal[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const normalized: Goal[] = [];

  for (const item of value) {
    const goal = sanitizeGoal(item);
    if (!goal) {
      return null;
    }

    normalized.push(goal);
  }

  return normalized;
}

export function getGoalState(goal: Goal) {
  const endDate = parseISO(goal.endDate);
  const today = startOfDay(new Date());
  const daysRemaining = differenceInCalendarDays(endDate, today);

  return {
    daysRemaining,
    dueToday: daysRemaining === 0,
    overdueDays: daysRemaining < 0 ? Math.abs(daysRemaining) : 0,
    dueSoon: goal.status === "current" && daysRemaining >= 0 && daysRemaining <= 3,
  };
}

export function formatGoalDate(value: string): string {
  return format(parseISO(value), "MMM d, yyyy");
}
