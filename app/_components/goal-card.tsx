import { getGoalState, type Goal } from "@/lib/goals";
import { formatGoalDate } from "@/lib/goals";

type GoalCardProps = {
  goal: Goal;
  onToggleComplete?: (goalId: string) => void;
  onDelete?: (goalId: string) => void;
};

export default function GoalCard({
  goal,
  onToggleComplete,
  onDelete,
}: GoalCardProps) {
  const state = getGoalState(goal);

  const dueLabel =
    goal.status === "completed"
      ? "Completed"
      : state.overdueDays > 0
        ? `${state.overdueDays} day${state.overdueDays === 1 ? "" : "s"} overdue`
        : state.dueToday
          ? "Due today"
          : `${state.daysRemaining} day${state.daysRemaining === 1 ? "" : "s"} left`;

  const cardTone =
    goal.status === "completed"
      ? "border-slate-200 bg-slate-50"
      : state.overdueDays > 0
        ? "border-red-200 bg-red-50"
        : state.dueSoon
          ? "border-amber-200 bg-amber-50"
          : "border-slate-200 bg-white";

  return (
    <article
      className={`rounded-2xl border p-4 shadow-sm transition-colors ${cardTone}`}
      aria-label={`${goal.title} goal card`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold text-slate-900">{goal.title}</p>
          <p className="mt-1 text-sm text-slate-600">{formatGoalDate(goal.endDate)}</p>
        </div>

        {goal.status === "current" ? (
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={false}
              onChange={() => onToggleComplete?.(goal.id)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              aria-label={`Mark ${goal.title} as complete`}
            />
            <span>Done</span>
          </label>
        ) : (
          <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
            Complete
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span
          className={
            state.overdueDays > 0
              ? "rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700"
              : state.dueToday
                ? "rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700"
                : "rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700"
          }
        >
          {dueLabel}
        </span>

        <button
          type="button"
          onClick={() => onDelete?.(goal.id)}
          className="text-sm font-medium text-red-600 transition hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
