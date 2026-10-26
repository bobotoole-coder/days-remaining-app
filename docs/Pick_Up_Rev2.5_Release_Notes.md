# Rev2.5 — Pick Up App — October 26, 2026

## Request outcomes

- Rename the request section to Update request outcome and its button to Save outcome.
- Assigned to another rep shows New rep and Days Remaining, not Replacement days. Its separate follow-up date is hidden. Notes are optional; when blank, the recorded note is Assigned to another rep.
- Saving another rep still starts the ordinary countdown from the supplied current Days Remaining, anchored today. Existing 21-day, 7-day and ready/current views continue unchanged. Request submission date, snapshot and outcome history remain intact.
- Still unassigned / needs follow-up shows only its follow-up date plus optional notes. A date remains required for this specific outcome; notes are now optional.
- Assigned to me and Confirmed available again hide both irrelevant field groups; their state transitions and explicit save remain unchanged.

## Preservation and upgrade

The change affects request-outcome presentation and optional/default notes only. Internal replacementDays is retained for backward compatibility; no existing history is rewritten. Account IDs, enrichment, timers, current requests, settings, resolution ledger and import rules are unchanged. Rev2.5 retains Rev2.4 compatible storage keys and format, so no automatic storage migration occurs.

Download a fresh Backup JSON in the current running app before switching. Open Rev2.5, import that fresh backup and verify count/header. A backup returned earlier in the day may not contain outcomes saved since then: do not use it instead of a fresh export. Preserve Rev2.4 and the fresh backup. JSON is the exact recovery format; CSV remains interchange. Use the same new file/path and browser profile afterward. Cross-file storage visibility depends on the browser; explicit import is the reliable transfer. No live browser or database changed by release tests.

## Verification

Actual Chromium tests cover current-format real-backup field/settings/ledger/timer preservation, actual file-picker import and repeated import, JSON export/fresh restore, reload and persistent-profile restart, and Rev2.4 fallback restore. Synthetic requested accounts exercise conditional field visibility and all four outcome transitions, 120-day assignment-to-other countdown and 21/7/0 thresholds, unchanged original submission snapshot/date, optional notes and default reassignment text. No private backup or test output is published. The user's live upgrade remains unverified until imported in their browser.
