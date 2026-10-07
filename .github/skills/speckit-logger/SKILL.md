---
name: "speckit-logger"
description: "Track every GitHub Spec Kit / Copilot command execution in per-feature logs."
---

# Spec Kit Command Logger

## Purpose

Track every GitHub Spec Kit / Copilot Spec Kit command execution in a per-feature log. Every command skill must append its own invocation record; do not rely on this logger skill being invoked separately. Create the feature directory and log on the first tracked command for that feature if they do not already exist. Every row must use the actual local datetime read from the system clock at logging time.

The logger records:

- Feature
- Branch
- Command
- Execution time
- Status
- Optional notes

Each log file must be named `spec-kit-log.md` and stored in its feature directory:

```text
specs/<feature-directory>/spec-kit-log.md
```

## Log Format

Append one entry for every command execution.

```markdown
| Execution Time (ISO 8601) | Feature | Branch | Command | Status | Notes |
|---|---|---|---|---|---|
| 2026-09-30 13:45:10 +05:30 | user-auth | feature/user-auth | /speckit-specify | SUCCESS | Created specification |
```

## Commands To Track

Track every command defined by a `.github/skills/speckit-*/SKILL.md` file, including:

```text
/speckit-specify
/speckit-plan
/speckit-tasks
/speckit-implement
/speckit-analyze
/speckit-checklist
/speckit-clarify
/speckit-constitution
/speckit-converge
/speckit-taskstoissues
```

Also track equivalent commands if they are executed through a Copilot/SpecKit workflow.

## Feature Detection

Determine the feature from the current Spec Kit feature context.

Resolve the feature directory using these sources, in order:

1. The feature directory being created or updated by the command (for example, `SPECIFY_FEATURE_DIRECTORY`)
2. `.specify/feature.json`'s `feature_directory` value
3. The current feature/spec directory
4. The current branch name or command arguments, converted to a feature slug under `specs/`
5. The feature directory containing the current `spec.md`, `plan.md`, or `tasks.md`

Preserve the resolved directory name exactly, including any numeric prefix (for example, `001-user-auth`). If no feature-specific context exists, use `specs/project`.

Examples:

```text
specs/001-user-auth/
```

Feature:

```text
user-auth
```

For a branch:

```text
feature/user-auth
```

Feature:

```text
user-auth
```

## Branch Detection

Get the current Git branch using:

```bash
git branch --show-current
```

Example:

```text
feature/user-auth
```

Never assume the branch name.

## Timestamp

Record the actual command completion time by reading the system clock immediately before appending the row. On Windows, run:

```powershell
Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz'
```

Copy the returned datetime into the log exactly as printed. Do not infer the time from the current date, reuse an example, or substitute `00:00:00`/midnight. A midnight value is valid only if the clock command actually returned midnight.

Use ISO 8601 format with timezone:

```text
YYYY-MM-DD HH:mm:ss ±HH:mm
```

Example:

```text
2026-09-30 13:45:10 +05:30
```

This is an illustrative value only; never reuse it for a real invocation.

## Status

Record:

```text
SUCCESS
FAILED
```

Use `SUCCESS` only when the command completed successfully.

Use `FAILED` when the command encountered an error or did not complete.

## Logging Procedure

After each tracked Spec Kit/Copilot command completes:

1. Detect the current Git branch.
2. Resolve the feature directory using `Feature Detection`.
3. Determine the executed command.
4. Read the live system clock and capture the actual datetime using the `Timestamp` procedure; never infer or default the time.
5. Determine command status.
6. Create the resolved directory under `specs/` if it does not exist.
7. Check for `specs/<feature-directory>/spec-kit-log.md`. If it does not exist, create it with the initial content below before recording the command.
8. Append exactly one new row for this command invocation to that feature's log.
9. Never overwrite the file or modify previous log entries unless explicitly requested.

## Initial Log File

If `specs/<feature-directory>/spec-kit-log.md` does not exist, create:

```markdown
# Spec Kit Command Execution Log

This file automatically tracks Spec Kit/Copilot command executions.

| Execution Time (ISO 8601) | Feature | Branch | Command | Status | Notes |
|---|---|---|---|---|---|
```

## Example

After:

```text
/speckit-specify Build user authentication
```

append:

```markdown
| 2026-09-30 13:45:10 +05:30 | user-auth | feature/user-auth | /speckit-specify | SUCCESS | Build user authentication |
```

After:

```text
/speckit-plan
```

append:

```markdown
| 2026-09-30 13:52:31 +05:30 | user-auth | feature/user-auth | /speckit-plan | SUCCESS | Generated implementation plan |
```

After:

```text
/speckit-tasks
```

append:

```markdown
| 2026-09-30 14:01:22 +05:30 | user-auth | feature/user-auth | /speckit-tasks | SUCCESS | Generated implementation tasks |
```

After:

```text
/speckit-implement
```

append:

```markdown
| 2026-09-30 14:20:45 +05:30 | user-auth | feature/user-auth | /speckit-implement | SUCCESS | Implementation completed |
```

## Important Rules

### One Log Per Feature

Always use one file named `spec-kit-log.md` inside each feature directory:

```text
specs/<feature-directory>/spec-kit-log.md
```

Do not write new entries to a project-root log or share a log between features. Create each feature's log on its first tracked command if it is missing.

### Append Only

Never replace the existing log.

Use append behavior:

```text
existing entries
        +
new command entry
```

### One Command = One Entry

Every actual command invocation must produce exactly one log entry.

For example:

```text
/speckit-specify
/speckit-plan
/speckit-tasks
/speckit-implement
```

must produce four entries.

### Failed Commands

Failed commands must also be logged.

Example:

```markdown
| 2026-09-30 14:25:17 +05:30 | user-auth | feature/user-auth | /speckit-implement | FAILED | TypeScript compilation failed |
```

### Branch Changes

Always capture the branch at the time the command is executed.

Do not reuse a previously recorded branch.

### Do Not Fake Execution

Only log commands that were actually invoked.

Never create a log entry merely because a command is planned or mentioned in conversation.