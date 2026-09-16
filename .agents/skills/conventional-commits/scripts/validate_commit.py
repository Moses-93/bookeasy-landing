#!/usr/bin/env python3
"""Commit message validator for Conventional Commits and project standards.

This module validates Git commit messages against the Conventional Commits
specification, checking for appropriate types, domain scopes, line length
constraints, and the absence of subjective conversational references.
"""

import re
import sys
from typing import List, Tuple

HEADER_PATTERN = re.compile(
    r"^(?P<type>feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)"
    r"(\((?P<scope>[a-z0-9-]+)\))?: "
    r"(?P<title>[a-z0-9].+)$"
)

MAX_HEADER_LENGTH = 72
RECOMMENDED_HEADER_LENGTH = 50

PROHIBITED_SUBSTRINGS = [
    "session",
    "chat",
    "dialog",
    "dialogue",
    "conversation",
    "memory",
    "as requested",
    "as discussed",
    "user request",
    "per user",
]


def validate_header(header: str) -> List[str]:
    """Validates the header line of a commit message.

    Args:
        header: The first line of the commit message.

    Returns:
        A list of validation error messages. Empty if valid.
    """
    errors: List[str] = []

    if not header.strip():
        return ["Commit header cannot be empty."]

    if len(header) > MAX_HEADER_LENGTH:
        errors.append(
            f"Header exceeds {MAX_HEADER_LENGTH} characters "
            f"(current length: {len(header)})."
        )

    match = HEADER_PATTERN.match(header)
    if not match:
        errors.append(
            "Header does not match Conventional Commits format: "
            "<type>(<scope>): <title> (e.g., 'feat(booking): add date picker')."
        )
    else:
        title = match.group("title")
        if title.endswith("."):
            errors.append("Header title must not end with a period.")

    return errors


def validate_content_neutrality(message: str) -> List[str]:
    """Validates that the commit message contains no subjective references.

    Args:
        message: The full commit message text.

    Returns:
        A list of validation error messages for prohibited subjective terms.
    """
    errors: List[str] = []
    lowered = message.lower()

    for prohibited in PROHIBITED_SUBSTRINGS:
        if prohibited in lowered:
            errors.append(
                f"Prohibited subjective reference detected: '{prohibited}'. "
                "Commit messages must be objective and technical."
            )

    return errors


def validate_body_format(body_lines: List[str]) -> List[str]:
    """Validates the structure of optional commit message body lines.

    Args:
        body_lines: Lines following the header and blank separator line.

    Returns:
        A list of validation error messages for the body structure.
    """
    errors: List[str] = []

    for idx, line in enumerate(body_lines, start=2):
        if not line.strip():
            continue
        if len(line) > MAX_HEADER_LENGTH:
            errors.append(
                f"Body line {idx} exceeds {MAX_HEADER_LENGTH} characters "
                f"(current length: {len(line)})."
            )

    return errors


def validate_commit_message(message: str) -> Tuple[bool, List[str]]:
    """Validates a complete commit message string.

    Args:
        message: The full commit message to validate.

    Returns:
        A tuple where the first element indicates whether the message is valid,
        and the second element contains all error descriptions.
    """
    lines = message.strip().splitlines()
    if not lines:
        return False, ["Commit message cannot be empty."]

    header = lines[0]
    all_errors: List[str] = []

    all_errors.extend(validate_header(header))
    all_errors.extend(validate_content_neutrality(message))

    if len(lines) > 1:
        if lines[1].strip() != "":
            all_errors.append(
                "Line 2 must be an empty line separating header and body."
            )
        all_errors.extend(validate_body_format(lines[2:]))

    return len(all_errors) == 0, all_errors


def main() -> int:
    """Main entrypoint for CLI validation."""
    if len(sys.argv) > 1:
        commit_message = sys.argv[1]
    else:
        commit_message = sys.stdin.read()

    is_valid, errors = validate_commit_message(commit_message)

    if not is_valid:
        print("ERROR: Commit message validation failed:", file=sys.stderr)
        for error in errors:
            print(f"  * {error}", file=sys.stderr)
        return 1

    print("OK: Commit message is valid.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
