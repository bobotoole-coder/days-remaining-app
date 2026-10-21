# Rev2.1 — historical request resolution and countdown visibility

October 21, 2026. Rev2 and all earlier HTML releases are preserved unchanged.

## Fixes

- Active account cards now offer **Record an earlier request**, independent of evaluation/form completeness. Enter the original submission date only if known, or leave it blank. **Save earlier request** moves the record to Requested; choose its known outcome and **Save resolution**. It never sends a request or assumes assignment.
- Unknown historical submission and assignment dates stay unknown. The app separately records when the history/outcome was entered. A supplied date without a time is displayed as a date, not an invented submission time. Undated historical attempts are counted explicitly in analytics; they are not counted as new submissions today.
- **Assigned to me** records PROSPECT, saved rep ownership and History, and offers a Magellan reconciliation handoff. Owned accounts no longer show an Open/unassigned badge.
- **Assigned to another rep** saves the rep and explicitly supplied replacement countdown and returns the same account to active tracking, retaining its historical attempt.
- Saving **positive replacement days** on an Open/unassigned account now explicitly changes its availability to DR and confirms that change. Previously, the replacement days and rep could save correctly while the Open flag still overrode the countdown display. Blank replacement days still preserve the existing anchor; ordinary enrichment edits do not restart it.

## Apply a corrected backup

The original current backup must remain unchanged. Corrections are delivered privately, never embedded in the public app.

1. Download/open Rev2.1 and keep the old HTML and original JSON backup as fallback.
2. Use **Import CSV / JSON** with the separately delivered corrected backup; check the account count and outcome placement.
3. Download a fresh **Backup JSON**, and continue using the same Rev2.1 file/path and browser profile.

The Rev2 storage/schema remains compatible; JSON and CSV exports include all account/history fields. Browser-local storage may differ between HTML paths and profiles, so explicit JSON import is the reliable transfer. Import previews the additions/updates/skips and remains idempotent. Only the named corrections are applied; unrelated notes, dates, records, IDs and header settings remain unchanged.

There is **no Magellan integration**. Local PROSPECT history is not proof of a database write. Download the reconciliation handoff and use the authorized Magellan workflow for any external write/readback. No prompts, installed skills or other model deployments were changed in this patch.

## Verification

- Latest user export: all 216 records retained; exactly three confirmed historical outcomes corrected; the other 213 records and every original note/header setting unchanged. Two successful assignments move out of active lists; the other-rep account remains active on the explicitly supplied countdown. Original submission/assignment dates were not guessed.
- Actual file-picker import of the original and corrected files; preview of 0 additions / 3 updates / 213 unchanged; repeat correction import idempotency; exact JSON export and persistent-profile close/reopen.
- New synthetic UI tests: undated/dated earlier request, duplicate prevention while requested, explicit saved outcome, unknown dates retained, no new daily submission count, positive days clearing Open mode, and another-rep resolution. Calendar anchors verified in America/New_York.
- Existing Rev2 regression suite passed against Rev2.1 and the latest real backup: 1/2/3-account form generation and submission, daily maximum, all resolution paths, follow-up reopening, repeat history, saved rep/countdowns, exact JSON/CSV restores, no page errors.
- Independent 1/2/3-account Excel ZIP/XML checks passed with the original template. Layout/styles/parts/images, headers, fixed Class/Status, hyperlinks and unused slots are unchanged. Desktop Excel opening remains unverified here.

```sh
NODE_PATH=/path/to/playwright/node_modules APP_FILENAME=Pick_Up_Rev2.1_2026-10-21.html CURRENT_BACKUP=/private/current.json TEST_OUTPUT=/private/regression node tests/verify_rev2.cjs
python3 tests/verify_rev2_workbook.py /private/regression
NODE_PATH=/path/to/playwright/node_modules CURRENT_BACKUP=/private/current.json CORRECTED_BACKUP=/private/corrected.json TEST_OUTPUT=/private/history node tests/verify_rev21_history.cjs
```

The real correction test expects the authorized three-record correction of a 216-account source; without those optional private inputs the history suite uses synthetic fixtures only. Private records, backups, test artifacts and reconciliation details are not committed to GitHub.
