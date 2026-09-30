<!--
Sync Impact Report
Version change: Unversioned scaffold -> 1.0.0 (initial adoption)
Modified principles: Unfilled principle slots -> Clean Code; Simple UX; Responsive Design;
	Minimal Dependencies; No Automated Testing
Added sections: Platform Constraints; Change Workflow
Removed sections: None
Follow-up TODOs: Confirm the original ratification date.
-->
# Task Constitution

## Core Principles

### I. Clean Code
Code MUST be readable, focused, and consistent with established project conventions.
Changes MUST avoid unnecessary duplication and unrelated complexity so that future
maintenance remains straightforward.

### II. Simple UX
User-facing workflows MUST make the primary task clear and minimize unnecessary steps,
choices, and visual noise. Controls and content MUST use consistent, understandable
language and behavior so users can act without guesswork.

### III. Responsive Design
Every user-facing view MUST remain usable across supported viewport sizes and input
methods. Layouts MUST adapt without clipping, overlap, or loss of essential content or
functionality.

### IV. Minimal Dependencies
The project MUST prefer capabilities already provided by its platform and current
dependencies. A new dependency MAY be introduced only when it provides a material benefit
that cannot be met reasonably with existing capabilities; its ongoing maintenance cost
MUST be considered.

### V. No Automated Testing
Contributors MUST NOT create or run unit tests, integration tests, or end-to-end tests.
Project plans and change requirements MUST NOT make those test types a quality gate.

## Platform Constraints

The application MUST use Next.js, React, and Tailwind CSS. The versions declared in
`package.json` are authoritative; application changes MUST remain compatible with those
declared versions and MUST NOT introduce a parallel framework in their place.

## Change Workflow

Changes MUST be reviewed for consistency with this constitution and the existing project
conventions. Review notes MUST identify any justified exception before it is accepted.
No automated test execution is part of the change workflow.

## Governance

This constitution governs project decisions. Amendments MUST update this document and
its version metadata together. Each amendment MUST be reviewed for its impact on existing
principles and project constraints.

The version uses MAJOR.MINOR.PATCH: MAJOR for backward-incompatible governance changes,
MINOR for new or materially expanded principles or sections, and PATCH for clarifications
that do not change requirements. Reviewers MUST assess whether a proposed change and its
rationale conform to the current principles; any exception MUST be explicit and justified.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Original adoption date is not recorded; confirm with project owner. | **Last Amended**: 2026-09-30
