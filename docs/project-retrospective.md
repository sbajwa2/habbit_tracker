# Project Retrospective

## Team and Project
- Team: Team 2
- Project: Habit Tracker
- Date: 2026-04-25

## 1) When was our team most effective or efficient?
Our team was most effective during sprint windows where we split ownership by feature area and then merged in small pull requests. A strong example was when one person focused on backend reminder APIs and Prisma updates while the other focused on frontend reminder forms, hooks, and page integration. Because each person worked in a clear boundary, we avoided merge conflicts and moved quickly from local testing to integrated testing.

Practices that helped:
- We set a clear "definition of done" before coding (API behavior, validation, UI behavior, and error handling).
- We checked in frequently with short updates and surfaced blockers early.
- We validated changes with builds before handoff, which reduced rework.

## 2) When was our team least effective or efficient?
We were least effective when requirements changed late or when implementation assumptions were not confirmed early. One recurring issue was beginning development without complete environment setup (missing variables, auth setup, or migration order), which caused interruptions and context switching.

Specific problems that slowed us down:
- Delayed environment alignment between frontend and backend for auth configuration.
- Rework after partially implementing a change that had to be adjusted to fit final requirement scope.
- Inconsistent sequencing of database migration and generated client updates.

## 3) What will we carry forward for future work?
This project highlighted that coordination and delivery quality improve when we establish interfaces and environment requirements first, then implement in small vertical slices.

Practices to continue:
- Define endpoint contracts and ownership before coding.
- Use short-lived feature branches and small PRs.
- Run type/build checks before sharing work.
- Keep requirements scoping explicit so each sprint target is realistic.

Practices to avoid or improve:
- Avoid starting implementation before environment variables and service keys are confirmed.
- Avoid combining unrelated changes in one branch when deadlines are close.
- Improve migration discipline by making one focused schema change per migration and validating generation/build immediately.

## Closing Reflection
Contributing to this project improved our practical skills in full-stack integration, API design, and incremental delivery. The biggest lesson is that strong planning and small, validated changes are usually faster than trying to ship large changes at once.