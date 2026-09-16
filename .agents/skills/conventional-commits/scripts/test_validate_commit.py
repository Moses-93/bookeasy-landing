"""Unit tests for the commit message validator script."""

import unittest
from validate_commit import (
    validate_commit_message,
    validate_header,
    validate_content_neutrality,
    validate_body_format,
)


class TestValidateCommitMessage(unittest.TestCase):
    """Test suite for Conventional Commits validation and repository rules."""

    def test_valid_scoped_headers(self):
        """Tests that valid scoped headers with kebab-case and single-word scopes pass."""
        valid_cases = [
            "feat(booking): add date picker",
            "fix(manual-booking): resolve slot selection timing discrepancy",
            "refactor(ui): update button styling",
            "docs(api): update public interface docstrings",
            "chore(deps): bump dependencies",
        ]
        for header in valid_cases:
            with self.subTest(header=header):
                errors = validate_header(header)
                self.assertEqual(errors, [])

    def test_valid_unscoped_headers(self):
        """Tests that valid unscoped headers pass."""
        valid_cases = [
            "docs: update readme",
            "chore: clean temporary files",
        ]
        for header in valid_cases:
            with self.subTest(header=header):
                errors = validate_header(header)
                self.assertEqual(errors, [])

    def test_reject_underscore_in_scope_regression(self):
        """Regression test ensuring underscore-delimited scopes are rejected."""
        invalid_scoped_headers = [
            "feat(foo_bar): add thing",
            "fix(manual_booking): fix timing bug",
            "refactor(landing_page): restructure components",
        ]
        for header in invalid_scoped_headers:
            with self.subTest(header=header):
                errors = validate_header(header)
                self.assertTrue(
                    len(errors) > 0,
                    f"Expected validation failure for header with underscore scope: {header}",
                )

    def test_reject_uppercase_in_scope(self):
        """Tests that uppercase characters in scopes are rejected."""
        errors = validate_header("feat(Booking): add date picker")
        self.assertTrue(len(errors) > 0)

    def test_reject_trailing_period(self):
        """Tests that headers with trailing periods are rejected."""
        errors = validate_header("feat(booking): add date picker.")
        self.assertIn("Header title must not end with a period.", errors)

    def test_reject_header_length_exceeded(self):
        """Tests that headers exceeding maximum length are rejected."""
        long_header = "feat(booking): " + "a" * 65
        errors = validate_header(long_header)
        self.assertTrue(any("Header exceeds 72 characters" in err for err in errors))

    def test_subjective_references_neutrality(self):
        """Tests detection of prohibited subjective conversational phrases."""
        prohibited_cases = [
            "fix(booking): fixed bug as requested by user",
            "feat(auth): implement session token per chat discussion",
            "refactor(ui): update dialog styling",
        ]
        for msg in prohibited_cases:
            with self.subTest(msg=msg):
                errors = validate_content_neutrality(msg)
                self.assertTrue(
                    len(errors) > 0,
                    f"Expected neutrality violation for message: {msg}",
                )

    def test_valid_multiline_commit(self):
        """Tests validation of complete commit message with body."""
        valid_msg = (
            "fix(storefront): use neutral schema type for master profiles\n"
            "\n"
            "- Replace HealthAndBeautyBusiness with LocalBusiness in JSON-LD\n"
            "- Ensure accurate indexing across diverse service provider categories\n"
        )
        is_valid, errors = validate_commit_message(valid_msg)
        self.assertTrue(is_valid)
        self.assertEqual(errors, [])

    def test_invalid_multiline_missing_blank_line(self):
        """Tests that missing blank separator line triggers a validation error."""
        invalid_msg = (
            "fix(storefront): use neutral schema type\n"
            "- Direct body without empty line\n"
        )
        is_valid, errors = validate_commit_message(invalid_msg)
        self.assertFalse(is_valid)
        self.assertTrue(any("Line 2 must be an empty line" in err for err in errors))

    def test_validate_body_format_valid(self):
        """Tests that valid body lines and whitespace pass validation."""
        valid_body = [
            "- First concise technical bullet point",
            "",
            "- Second concise technical bullet point",
        ]
        errors = validate_body_format(valid_body)
        self.assertEqual(errors, [])

    def test_validate_body_format_line_length_exceeded(self):
        """Tests that body lines exceeding length limit return descriptive errors."""
        long_line = "- " + "a" * 75
        body = [long_line]
        errors = validate_body_format(body)
        self.assertEqual(len(errors), 1)
        self.assertIn("Body line 2 exceeds 72 characters", errors[0])


if __name__ == "__main__":
    unittest.main()
