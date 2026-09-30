"use client";

import { useMemo, useState } from "react";

import GoalCard from "@/app/_components/goal-card";
import NewGoalDialog from "@/app/_components/new-goal-dialog";
import {
  generateGoalId,
  getStorageKey,
  parseStoredGoals,
  type Goal,
} from "@/lib/goals";

function readStoredGoals() {
  if (typeof window === "undefined") {
    return {
      goals: [] as Goal[],
      storageError: null as string | null,
      hasInvalidStorage: false,
    };
  }

  try {
    const raw = window.localStorage.getItem(getStorageKey());

    if (raw === null) {
      return {
        goals: [] as Goal[],
        storageError: null,
        hasInvalidStorage: false,
      };
    }

    const parsed = JSON.parse(raw) as unknown;
    const storedGoals = parseStoredGoals(parsed);

    if (storedGoals === null) {
      return {
        goals: [] as Goal[],
        storageError:
          "Saved goals could not be read in this browser, so the stored data was left unchanged.",
        hasInvalidStorage: true,
      };
    }

    return {
      goals: storedGoals,
      storageError: null,
      hasInvalidStorage: false,
    };
  } catch {
    return {
      goals: [] as Goal[],
      storageError: "Your saved goals could not be loaded in this browser.",
      hasInvalidStorage: true,
    };
  }
}

export default function GoalManager() {
  const [initialStorage] = useState(() => readStoredGoals());
  const [goals, setGoals] = useState<Goal[]>(initialStorage.goals);
  const [storageError] = useState<string | null>(initialStorage.storageError);
  const [hasInvalidStorage] = useState(initialStorage.hasInvalidStorage);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function persistGoals(nextGoals: Goal[]) {
    if (typeof window === "undefined" || hasInvalidStorage) {
      return;
    }

    try {
      window.localStorage.setItem(getStorageKey(), JSON.stringify(nextGoals));
    } catch {
      // Storage write failures are handled through the visible message below and do not crash the board.
    }
  }

  const currentGoals = useMemo(
    () => goals.filter((goal) => goal.status === "current"),
    [goals],
  );

  const completedGoals = useMemo(
    () => goals.filter((goal) => goal.status === "completed"),
    [goals],
  );

  const addGoal = ({ title, endDate }: { title: string; endDate: string }) => {
    const nextGoal: Goal = {
      id: generateGoalId(),
      title,
      endDate,
      status: "current",
    };

    const nextGoals = [nextGoal, ...goals];
    setGoals(nextGoals);
    persistGoals(nextGoals);
    setIsDialogOpen(false);
  };

  const completeGoal = (goalId: string) => {
    const nextGoals: Goal[] = goals.map((goal): Goal =>
      goal.id === goalId && goal.status === "current"
        ? { ...goal, status: "completed" }
        : goal,
    );

    setGoals(nextGoals);
    persistGoals(nextGoals);
  };

  const deleteGoal = (goalId: string) => {
    const goalToDelete = goals.find((goal) => goal.id === goalId);
    if (!goalToDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Delete “${goalToDelete.title}”? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    const nextGoals = goals.filter((goal) => goal.id !== goalId);
    setGoals(nextGoals);
    persistGoals(nextGoals);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-700">Task Manager</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Your goals</h1>
        </div>

        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          + Add goal
        </button>
      </div>

      {storageError ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {storageError}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-900">Current goals</h2>
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
              {currentGoals.length}
            </span>
          </div>

          <div className="space-y-4">
            {currentGoals.length > 0 ? (
              currentGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onToggleComplete={completeGoal}
                  onDelete={deleteGoal}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
                No current goals yet.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-900">Completed</h2>
            <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">
              {completedGoals.length}
            </span>
          </div>

          <div className="space-y-4">
            {completedGoals.length > 0 ? (
              completedGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} onDelete={deleteGoal} />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-600">
                No completed goals yet.
              </div>
            )}
          </div>
        </section>
      </div>

      <NewGoalDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={addGoal}
      />
    </div>
  );
}
