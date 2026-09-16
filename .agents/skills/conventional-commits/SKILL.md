---
name: conventional-commits
description: Draft, format, and validate Conventional Commit messages with domain-driven scopes by inspecting git diffs. Use when asked to generate a commit message, prepare commit text, or format commit history for developer review.
---

# Conventional Commits Skill

This skill guides the construction, formatting, and validation of Git commit messages according to the Conventional Commits specification, Clean Architecture / DDD domain boundaries, and repository standards.

---

## 1. Core Principles

1. **Conciseness**:
   - Focus on intent, high-level behavioral changes, and architectural rationale.
   - Do NOT leak low-level code mechanics (e.g., variable names, specific line numbers, internal AST diffs) into the commit message.

2. **Strict Objectivity**:
   - Commit messages must be strictly technical and objective based solely on `git diff` and repository history.
   - NEVER reference subjective entities, conversations, prompts, user requests, chat sessions, or memory context (e.g., avoid "as discussed", "per user prompt", "fixed bug found during chat").

3. **Language**:
   - All commit messages must be written in **English**.

4. **Formatting Consistency**:
   - Follow the Conventional Commits specification.
   - Header length must be <= 72 characters (recommended <= 50 characters).
   - Use imperative, present-tense verbs in the title (e.g., `add`, `fix`, `refactor`, `standardize`, `remove`).
   - Do not end the header title with a period.

---

## 2. Preparation Workflow

Before formulating a commit message, inspect the repository state using these standard steps:

1. **Inspect status and staged files**:

   ```bash
   git status
   ```

2. **Review exact staged changes**:

   ```bash
   git diff --staged
   ```

   *(If changes are not yet staged, review `git diff` before staging).*
3. **Check recent commit history**:

   ```bash
   git log -n 5 --oneline
   ```

   *Verify consistent scope naming and conventions with previous commits in the repository.*

4. **Deliver drafted message to developer**:
   - Present the formulated commit message in a code block for review.
   - Provide the ready-to-use `git commit -m "..."` command snippet.

---

## 3. Commit Message Structure

```text
<type>(<scope>): <title>

- <bullet point description of change> (optional)
- <bullet point description of change> (optional)
```

### 3.1 Allowed Types

| Type | When to Use |
| :--- | :--- |
| `feat` | A new feature or user-facing functionality |
| `fix` | A bug fix |
| `refactor` | Code restructuring without fixing a bug or adding a feature |
| `perf` | Code changes specifically aimed at improving performance |
| `style` | Formatting, whitespace, or visual styling changes (no logic changes) |
| `docs` | Documentation updates (README, docstrings, architectural docs) |
| `test` | Adding missing tests or correcting existing tests |
| `build` | Changes affecting build system, packaging, or external dependencies |
| `ci` | Changes to CI/CD configuration files and pipelines |
| `chore` | Routine maintenance tasks (e.g., linting configs, tooling updates) |
| `revert` | Reverts a previous commit |

### 3.2 Domain Scopes (DDD)

Derive `<scope>` from the bounded context / business domain of the modified code:

- **Domains / Modules**: `booking`, `auth`, `schedule`, `client`, `service`, `notification`, `calendar`, `payment`
- **Layers / Cross-cutting**: `api`, `ui`, `db`, `config`, `deps`

*Rules for scope:*

- Use lowercase alphanumeric characters and hyphens only (e.g., `booking`, `manual-booking`).
- Avoid using arbitrary file paths or variable names as scopes.

### 3.3 Title Formatting

- Format: `<type>(<scope>): <title>`
- Start `<title>` with a lowercase letter (or symbol/word as appropriate).
- Use imperative mood: `add feature` (not `added feature` or `adds feature`).
- Do not place a period `.` at the end of the title.

### 3.4 Optional Body

When changes require additional context, add a blank line followed by bullet points:

- Prefix each point with `-`.
- Capitalize the first letter of each bullet item.
- Explain *what* was changed and *why*, at a domain/architectural level.
- Keep each line <= 72 characters.

---

## 4. Validation

### Standard Tooling (`commitlint`)

Validate a message using `commitlint` via `npx`:

```bash
echo "feat(booking): implement manual booking form" | npx --yes @commitlint/cli --config @commitlint/config-conventional
```

### Standalone Validation Script

Use the bundled validator to check both Conventional Commits structure and project neutrality rules:

```bash
python3 .agents/skills/conventional-commits/scripts/validate_commit.py "feat(booking): implement manual booking form"
```

---

## 5. Examples

### Good Examples

```text
refactor(booking): standardize manual booking form styling and layout
```

```text
fix(booking): initialize form state on manual booking modal open

- Mount inner form conditionally to reset and sync state on modal open
- Initialize start time, end time, and date from draft props
```

```text
feat(auth): add token refresh endpoint with sliding expiration
```

```text
chore(deps): update vite and typescript dependencies
```

### Bad Examples & Anti-Patterns

| Bad Message | Why it is invalid | Corrected Version |
| :--- | :--- | :--- |
| `Fixed bug as requested by user in chat` | Mentions chat session, non-conventional format, past tense | `fix(booking): resolve slot selection timing discrepancy` |
| `feat(booking): changed line 45 in form.tsx and renamed variable x to y` | Leaks low-level code mechanics instead of intent | `feat(booking): add client selection dropdown to booking form` |
| `Update code` | Missing type, missing scope, vague | `refactor(schedule): simplify timeline event mapping` |
| `fix(ui): Fixed button color.` | Past tense, capital letter after colon, trailing period | `fix(ui): adjust button color contrast` |
| `feat(booking): додати нову форму бронювання` | Non-English language | `feat(booking): add manual booking creation form` |
