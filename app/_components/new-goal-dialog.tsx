import { useState } from "react";

import { isValidDateValue } from "@/lib/goals";

type NewGoalDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (goal: { title: string; endDate: string }) => void;
};

export default function NewGoalDialog({
  open,
  onClose,
  onSubmit,
}: NewGoalDialogProps) {
  const [title, setTitle] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ title?: string; endDate?: string }>({});

  if (!open) {
    return null;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const nextErrors: { title?: string; endDate?: string } = {};

    if (!trimmedTitle) {
      nextErrors.title = "Please enter a goal title.";
    }

    if (!endDate || !isValidDateValue(endDate)) {
      nextErrors.endDate = "Please choose a valid end date.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    onSubmit({ title: trimmedTitle, endDate });
    setTitle("");
    setEndDate("");
    setFieldErrors({});
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-goal-title"
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="new-goal-title" className="text-2xl font-semibold text-slate-900">
              Add a goal
            </h2>
            <p className="mt-1 text-sm text-slate-600">Capture a new objective and its deadline.</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setTitle("");
              setEndDate("");
              setFieldErrors({});
              onClose();
            }}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close add goal form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="goal-title" className="mb-2 block text-sm font-medium text-slate-700">
              Goal title
            </label>
            <input
              id="goal-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Finish roadmap review"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              aria-invalid={Boolean(fieldErrors.title)}
            />
            {fieldErrors.title ? (
              <p className="mt-2 text-sm text-red-600">{fieldErrors.title}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="goal-end-date" className="mb-2 block text-sm font-medium text-slate-700">
              End date
            </label>
            <input
              id="goal-end-date"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              aria-invalid={Boolean(fieldErrors.endDate)}
            />
            {fieldErrors.endDate ? (
              <p className="mt-2 text-sm text-red-600">{fieldErrors.endDate}</p>
            ) : null}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setEndDate("");
                setFieldErrors({});
                onClose();
              }}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Save goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
