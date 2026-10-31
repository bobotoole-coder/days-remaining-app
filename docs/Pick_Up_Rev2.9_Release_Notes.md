# Rev2.9 — evaluated counts and readable product scores

October 31, 2026

## Changes

- Known PICK UP/REJECT spelling variants are interpreted consistently across overview counts, filters, readiness, request eligibility, analytics and the editor. Existing saved records and history are not normalized in storage merely by opening the app.
- Valid legacy scored evaluations remain evaluated. Missing scores, explicit needs-evaluation and unknown verdicts are not counted as completed.
- Evaluation and form readiness remain distinct: a scored account missing request fields is shown as evaluated with an incomplete form, and cannot be selected for a request.
- Overview cards show all four product scores in a compact 12px line. Expanded account details show bold 18px product labels and bold 32px score values (30px on narrow screens).
- Long detail content wraps on narrow screens; the detail scores remain inside the account card.

## Preservation and upgrade

Rev2.8 and all older source files remain unchanged. No score-scale migration, countdown reset, lifecycle change, cleanup, submission, database connection or account removal is included. Compatible `pick_up_rev28` / `pick_up_rev28_form` storage keys are retained; backups identify appRevision 2.9. Keep the prior app and fresh Backup JSON. Use JSON import to transfer across local-file paths or Chrome profiles, then verify totals and back up again. Use the same new file/path/profile thereafter.

JSON is the exact recovery format for account records, form settings, resolution receipts and retained evaluation summaries. CSV preserves exact account payloads but does not restore all app-level settings and ledgers.

## Verification

Browser checks use the private 539-account backup outside this repository and separate persistent profiles for real data, JSON recovery, CSV account recovery and synthetic behavior. Checks cover exact account/settings/ledger preservation, alias recognition, filter/readiness agreement, compact and expanded score presentation, narrow-screen wrapping, repeat import, JSON export/restore, CSV account restoration, same-file/profile close/reopen persistence and countdowns. Synthetic unknown, reject, legacy and incomplete-form cases exercise selection boundaries without public customer fixtures.

Live rollout in Bob’s Chrome profile remains user-side; isolated tests do not claim live installation. No Excel template or workbook-generation code changed.
