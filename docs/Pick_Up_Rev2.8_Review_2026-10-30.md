# Rev2.8 independent review — October 30, 2026

Attached HTML exactly matches committed source. SHA-256: `5171008fdab13a337a614036c83afcaf53382ce5c5a737c594625e7f1ab509f6`.

Existing verify_rev28.cjs passed against a previously supplied private 455-entry / 16-receipt backup: exact entry/settings/receipt preservation, grading boundaries, range validation, overall sorting, legacy separation and evaluation-summary retention. This is not the October 30 ChatGPT-session backup, which was not attached here. No private backup or operational company data committed.

Independent isolated Chromium check passed: 455 entries and 16 receipts preserved, synthetic new scores saved, page closed/reopened within the same browser context with exact state, Backup JSON downloaded, storage cleared and JSON restored exactly. An initial harness restore attempt did not wait for the asynchronous import; the corrected dialog-aware run passed. No live user browser data changed. This proves page close/reopen, not a complete browser-process restart.

## Confirmed review findings

- Card readiness and summary evaluation counts use different definitions: a legacy REJECT can display Evaluated YES while not counted as newly ranked. This is the inconsistency reported in the user's separate ChatGPT transcript.
- A new overall ranking does not require all four product scores; it does not replace existing request eligibility rules. Product completeness and form completeness remain separate.
- New request snapshots omit pickupScoreScale even when a legacy /100 score is present. Existing snapshots are unchanged; a future correction should preserve the scale in new snapshots.
- Retained evaluation summaries are one latest summary per account ID, not a complete longitudinal revision history. Evaluation events may carry additional historical evidence.

Rev2.8 is preserved byte-for-byte by this review; no corrective app revision has been installed or published. User reported 455 visible working accounts; native user save/reopen/export remains to verify with a real evaluation. JSON is the full recovery format; CSV is interchange, not complete recovery. All prior app versions remain unchanged.
