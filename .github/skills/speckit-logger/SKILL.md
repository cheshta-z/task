---
name: "speckit-logger"
description: "Track every GitHub Spec Kit / Copilot command execution in a single project log. ."
---

# Spec Kit Command Logger

## Purpose

Track every GitHub Spec Kit / Copilot command execution in one project-root log. Create the log on the first tracked command if it does not already exist.

The logger records:

- Feature
- Branch
- Command
- Execution time
- Status
- Optional notes

The log file must be named `spec-kit-log.md` and stored at the project root:

```text
spec-kit-log.md
```

## Log Format

Append one entry for every command execution.

```markdown
| Date/Time | Feature | Branch | Command | Status | Notes |
|---|---|---|---|---|---|
| 2026-09-30 13:45:10 +05:30 | user-auth | feature/user-auth | /specify | SUCCESS | Created specification |
```

## Commands To Track

Track these commands:

```text
/speckit-specify
/speckit-plan
/speckit-tasks
/speckit-implement
```

Also track equivalent commands if they are executed through a Copilot/SpecKit workflow.

## Feature Detection

Determine the feature from the current Spec Kit feature context.

Preferred sources, in order:

1. Current feature/spec directory
2. Current branch name
3. Command arguments
4. Existing `spec.md`
5. Existing `plan.md`
6. Existing `tasks.md`

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

Record the actual command execution time.

Use ISO 8601 format with timezone:

```text
YYYY-MM-DD HH:mm:ss ±HH:mm
```

Example:

```text
2026-09-30 13:45:10 +05:30
```

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
2. Detect the feature name.
3. Determine the executed command.
4. Capture the current timestamp.
5. Determine command status.
6. Check for `spec-kit-log.md` at the project root. If it does not exist, create it with the initial content below before recording the command.
7. Append exactly one new row for this command invocation to that file.
8. Never overwrite the file or modify previous log entries unless explicitly requested.

## Initial Log File

If `spec-kit-log.md` does not exist, create:

```markdown
# Spec Kit Command Execution Log

This file automatically tracks Spec Kit/Copilot command executions.

| Date/Time | Feature | Branch | Command | Status | Notes |
|---|---|---|---|---|---|
```

## Example

After:

```text
/specify Build user authentication
```

append:

```markdown
| 2026-09-30 13:45:10 +05:30 | user-auth | feature/user-auth | /specify | SUCCESS | Build user authentication |
```

After:

```text
/plan
```

append:

```markdown
| 2026-09-30 13:52:31 +05:30 | user-auth | feature/user-auth | /plan | SUCCESS | Generated implementation plan |
```

After:

```text
/tasks
```

append:

```markdown
| 2026-09-30 14:01:22 +05:30 | user-auth | feature/user-auth | /tasks | SUCCESS | Generated implementation tasks |
```

After:

```text
/implement
```

append:

```markdown
| 2026-09-30 14:20:45 +05:30 | user-auth | feature/user-auth | /implement | SUCCESS | Implementation completed |
```

## Important Rules

### Single Log

Always use the one project-root file named:

```text
spec-kit-log.md
```

Do not create separate logs for individual features or store the log in a feature directory. Create the file on the first tracked command if it is missing.

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
/specify
/plan
/tasks
/implement
```

must produce four entries.

### Failed Commands

Failed commands must also be logged.

Example:

```markdown
| 2026-09-30 14:25:17 +05:30 | user-auth | feature/user-auth | /implement | FAILED | TypeScript compilation failed |
```

### Branch Changes

Always capture the branch at the time the command is executed.

Do not reuse a previously recorded branch.

### Do Not Fake Execution

Only log commands that were actually invoked.

Never create a log entry merely because a command is planned or mentioned in conversation.