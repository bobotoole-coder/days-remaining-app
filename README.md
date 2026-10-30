# Pick Up App (formerly Days Remaining)

Current saved version: [Rev2.8 — Pick Up App](Pick_Up_Rev2.8_2026-10-30.html)

Rev2.8 adds four 1–10 product scores and an independent overall 1–100 score, grades, confidence and retained evaluation summaries. Legacy scores remain separate, not automatically converted into new overall rankings. [Rev2.8 release notes](docs/Pick_Up_Rev2.8_Release_Notes.md) · [independent review and known issues](docs/Pick_Up_Rev2.8_Review_2026-10-30.md).

Rev2.8 source is saved in GitHub; the latest separately published release asset is still Rev2.7. Keep older app files and an exact JSON backup. Do not use an old backup to overwrite newer live edits.

Previous release: [Rev2.7 — Pick Up App](Pick_Up_Rev2.7_2026-10-29.html)

[Download Pick Up Rev2.7](https://github.com/bobotoole-coder/days-remaining-app/releases/download/pick-up-rev2.7/Pick_Up_Rev2.7_2026-10-29.html)

## Rev2.7 — 1–100 ranking scores

Pick Up Scores now accept whole numbers **1–100**, with blank allowed. Use finer assessments such as 43 versus 48. Legacy 1–10 scores convert once (4 → 40, 5 → 50); conversion does not invent new distinctions or re-evaluate accounts. Score sorting puts blanks last in either direction. There is no automated scoring formula.

**Upgrade:** download a fresh Backup JSON in your current app, open Rev2.7 and import it. Check your account count and scores, then make a new backup. Keep the old app and original JSON as fallback. Rev2.7 uses separate browser storage and leaves prior storage untouched; use the same new file/path and browser profile afterward. Import is the reliable transfer method across local paths/profiles.

New JSON backups declare `pickupScoreScale: 100`; scored records also carry that marker, including exact-record CSV payloads. New plain CSVs have a Pick Up Score Scale column. Unmarked legacy scores are interpreted as 1–10; include the marker when preparing new 1–100 enrichments, especially scores of 1–10. New-scale backups belong in Rev2.7, not older apps. JSON is the exact recovery format; CSV remains interchange and cannot recover settings or the cleanup ledger.

Historical notes and submitted request snapshots retain their original evidence and score scale; new snapshots include the scale marker. Timers, recommendations, lifecycle, requests and verified resolution receipts are not re-scored or changed. Pre-upgrade pending cleanup receipts may need a fresh verification against a new backup because active ranking records have changed; the app never bypasses receipt hashes.

[Rev2.7 release notes and verification](docs/Pick_Up_Rev2.7_Release_Notes.md)

Previous releases preserved below.

[Download Pick Up Rev2.6](https://github.com/bobotoole-coder/days-remaining-app/releases/download/pick-up-rev2.6/Pick_Up_Rev2.6_2026-10-28.html)

## Rev2.6 — denied requests and personal revisit timers

Choose **Request denied — set revisit timer** in the now-visible **Update request outcome** controls. Enter the denial reason and your own calendar-day timer. **Denied / Revisit** keeps these accounts separate from Available now. On expiry, they appear under **Revisit due — previously denied**, never automatically selectable or confirmed available. Check Compass and review timing with Alex before explicitly returning one to active. Prior denial evidence and every request attempt remain preserved; request denial is not account rejection.

Before upgrading, download a fresh Backup JSON from your running app. Open Rev2.6, import that backup, verify the account count/header, and make a new backup. Continue using the same new path/browser profile. Keep Rev2.5 and your pre-upgrade JSON as fallback. Use Rev2.6 for new denial backups; older apps cannot operate the new states. JSON is exact recovery; CSV is interchange. No account changes occur merely by upgrading.

[Rev2.6 release notes and verification](docs/Pick_Up_Rev2.6_Release_Notes.md)

Previous releases preserved below.

[Download Pick Up Rev2.5](https://github.com/bobotoole-coder/days-remaining-app/releases/download/pick-up-rev2.5/Pick_Up_Rev2.5_2026-10-26.html)

## Rev2.5 — straightforward request outcomes

Choose **Update request outcome** inside the account details. **Assigned to another rep** shows only **New rep**, **Days Remaining** and **Notes (optional)**. Save restarts the normal countdown from today; the account returns to active lists and the usual 21-day, 7-day and current views as it comes due. Blank notes record “Assigned to another rep.” automatically. A follow-up date appears only for **Still unassigned / needs follow-up**; its notes are optional too. Other outcomes retain their existing behavior.

No schema, import, cleanup-ledger, score or submission-history change. Rev2.5 uses the same compatible storage keys/format as Rev2.4, not a new database. Before upgrading, download a **fresh Backup JSON** from your running app, open Rev2.5, import that backup and check the account total/header. Different local paths/browser profiles may not share storage; JSON backup/import is the reliable transfer. Keep Rev2.4 and the fresh backup as fallback. Continue using the same new file/path and browser profile. JSON is exact recovery; CSV is interchange.

[Rev2.5 release notes and checks](docs/Pick_Up_Rev2.5_Release_Notes.md)

Previous release: Rev2.4, preserved below.

[Download Pick Up Rev2.4](https://github.com/bobotoole-coder/days-remaining-app/releases/download/pick-up-rev2.4/Pick_Up_Rev2.4_2026-10-26.html)

## Rev2.4 — verified completed-account cleanup

Keep unresolved accounts in the working app. Once assignment to Bob or a final rejection is confirmed, save the complete record and evidence in Supabase, independently read it back, and import the resulting cleanup JSON. Full account records then leave the app; compact identity, verification and request-outcome summaries retain analytics and block accidental restoration from older imports.

**This is a supervised handoff, not an automatic database connection.** Click **Prepare Supabase cleanup** to download a fresh backup and send it to Spock. A REJECT recommendation alone, Archive alone, or an awaiting request is not authorization to delete the record. Nothing is removed merely by upgrading.

Rev2.4 uses separate browser storage and leaves earlier versions' storage untouched. Download a fresh Backup JSON in the current app, open Rev2.4, import that backup, and check the count/header. Keep the prior app and backup. JSON is the exact recovery format, including cleanup summaries; CSV is interchange and cannot restore the full cleanup ledger. Do not use an older app with a cleaned Rev2.4 backup: the old app cannot preserve its analytics ledger.

[Rev2.4 release notes and checks](docs/Pick_Up_Rev2.4_Release_Notes.md)

Previous release: [Rev2.3 — Pick Up App](Pick_Up_Rev2.3_2026-10-25.html)

[Download Pick Up Rev2.3](https://github.com/bobotoole-coder/days-remaining-app/releases/download/pick-up-rev2.3/Pick_Up_Rev2.3_2026-10-25.html)

## Rev2.3 — explicit evaluation classifications

- Replaces ambiguous evaluated PASS with **Evaluated: YES — REJECT**.
- Completed positive recommendations explicitly show **PICK UP**, followed by readiness or countdown information. Incomplete evaluations retain their existing status.
- Label-only change; no classification values, account fields, timers, request history, selection rules, or database records changed.
- Upgrade: make a fresh Backup JSON in your current app, open Rev2.3, import that backup and verify the count/header. Keep Rev2.2 and its backup. Use the same new file/path and browser profile afterward. JSON is the exact recovery format; CSV is interchange.

[Rev2.3 release notes](docs/Pick_Up_Rev2.3_Release_Notes.md)

[Download Pick Up Rev2.2](https://github.com/bobotoole-coder/days-remaining-app/releases/download/pick-up-rev2.2/Pick_Up_Rev2.2_2026-10-23.html)

## Rev2.2 — clear readiness and compact accounts

- Ready/available total first, with evaluated and not-evaluated counts; coming soon counts only days 1–7. Upcoming 1–21 excludes already-ready records. All availability counts exclude submitted/history records.
- Full-data tab counts; All Accounts explicitly labels active records. History includes previous attempts and can overlap other tabs. Search and filters narrow lists, not summary totals.
- One evaluation: score, recommendation and required site/spend/form fields. A saved REJECT recommendation counts as evaluated (displayed as PASS in Rev2.2), never selectable. Missing form fields are labeled incomplete, not ready to request. Estimates remain distinguished in notes; zero is never filled automatically.
- Large black-outline selection boxes, large scores, sticky submission toolbar, collapsible notes and request administration; Expand/Collapse all. Warnings and identity links remain visible.
- No account data changes, timer resets, automatic submissions, or database writes. Preserve older releases.

**Upgrade from Rev2.1:** back up your current data; open Rev2.2 and import the latest JSON; verify the count and form header. Keep the older app and backup. Use the same new file/path and browser profile afterward. JSON is the exact recovery format; CSV remains an interchange format with exact-record payloads.

[Rev2.2 release notes](docs/Pick_Up_Rev2.2_Release_Notes.md)


[Download Pick Up Rev2.1](https://github.com/bobotoole-coder/days-remaining-app/releases/download/pick-up-rev2.1/Pick_Up_Rev2.1_2026-10-21.html)

## Rev2.1 historical-request fixes

For an already-sent request still in active lists, choose **Record an earlier request** on its card. Save the original date only if known (otherwise leave blank), then resolve it in Requested. No date is guessed. Unknown historical dates are not counted as new submissions today.

Positive replacement days now clear Open/unassigned mode, so saved rep/countdown updates are visible.

[Rev2.1 usage and verification](docs/Pick_Up_Rev2.1_Release_Notes.md) · [Rev2 fallback](Pick_Up_Rev2_2026-10-21.html)

## Preserved Rev2 workflow

Ready & Upcoming → save DR evaluation → select 1–3 available accounts → Generate request → send separately → Mark submitted → resolve in Requested. History retains outcomes and repeated attempts.

Blank replacement-countdown input preserves the existing countdown. Enter replacement days only to restart it. Positive replacement days select DR rather than Open/unassigned. Save edits and form headers explicitly.

**Upgrade:** make a fresh Rev1 JSON backup, import it into Rev2, check your count/header, then make a Rev2 backup. Keep Rev1 and its backup as fallback. Continue using the same Rev2 file/path and browser profile. No automatic Magellan writes.

[Rev2 release notes, usage and verification](docs/Pick_Up_Rev2_Release_Notes.md) · [Rev1 fallback](Pick_Up_Rev1_2026-10-14.html)

Standalone HTML, including offline Excel export. Download and open in your browser.

## Preserved Rev1 additions

- Open/unassigned accounts at the top with zero waiting days; existing DR countdowns retained.
- Editable 1–10 Pick Up Score and score sorting; no automatic formula.
- HQ and North American City/State, location/on-net counts and monthly MRC spend.
- Independent ON HOLD / HAS DUPLICATES flags.
- Select up to three accounts and export the supplied October 13 Excel form,
  preserving its layout without extra fields or sheets.
- Saved manager/rep headers and manually editable current account count.
- Export does not submit, assign or remove accounts. Original Rev1 made no DR/RD skill changes.

**Moving from Days Remaining:** keep the old HTML and make a JSON backup in it.
Open Pick Up Rev1 and use **Import CSV / JSON** to import that backup. Keep using
that same new file and browser profile; then download a fresh JSON backup.
Automatic access to an old local HTML file's storage is browser-dependent.

[Full change log, compatibility details and verification](docs/Pick_Up_Rev1_Release_Notes.md)

## What it does

The inherited Days Remaining workflow is a standalone browser-based account countdown tracker.
It helps track how many days remain for each company or account and highlights
items approaching their deadline.

Features:

- Add company, website, Compass link, representative, notes, and starting days.
- Automatically reduce days remaining as calendar days pass.
- Highlight accounts due within 21 days and within 7 days.
- Edit, sort, and remove account records.
- Store data locally in the browser.
- Export records to CSV for review and merging.
- Download exact JSON backups for restoration.
- Import JSON backups, Days Remaining CSV exports, or Compass Batch Checker CSV results.
- Import valid `DR` rows plus explicit `Pick Up`/`OPEN`/`UNASSIGNED` rows from a Tampermonkey result; ignore other statuses.
- Block duplicate manual additions and edits by normalized company domain, Compass URL, or company name.
- Merge duplicates during CSV, JSON, and Tampermonkey import so the stored list remains unique.
- Preview add/update/skip counts before an import changes browser storage.

## How to use it

Download the current HTML file and open it in a web browser. No installation or
server is required.

Use **Backup JSON** for an exact restorable backup. Use **Export CSV** for a
spreadsheet or for the Compass merge workflow. **Import CSV / JSON** accepts
both formats. Tampermonkey CSV rows require a valid `Days Remaining` value;
other statuses are ignored. Explicit open-account statuses need no waiting days.

## Data and privacy

Account data is stored in the browser's local storage. This repository contains
only the empty application, sanitized form template, dependencies and documentation; it must not contain exported
account records or other private business data.

## Versioning

Every released version is preserved. Rev2 is the explicitly requested workflow upgrade; old versions remain separate immutable fallback files.

## Release history

- **Pick Up Rev2.1 — 2026-10-21:** Record/resolve historical requests without guessed dates; distinguish owned-account History; clear stale Open mode when positive replacement days are saved. Rev2 preserved.

- **Pick Up Rev2 — 2026-10-21:** Three working tabs, explicit submission/resolution lifecycle, follow-up and History/analytics, explicit countdown replacement and persistence fixes, exact backups, portable prompt/glossary update. Rev1 preserved.

- **Pick Up Rev1 — 2026-10-14:** Backward-compatible successor to Days Remaining Rev1.3. Adds manually scored open-account selection and exact-template Excel pickup forms. Prior releases unchanged.

- **Rev1.3 — 2026-09-26:** Restores strict duplicate protection across manual adds, edits, CSV imports, JSON restores, and Tampermonkey imports. Supersedes Rev1.2 for normal use.
- **Rev1.2 — 2026-09-26:** Preserves the exact row count and repeated-domain records when restoring full Days Remaining CSV or JSON data, while retaining domain-based merging for new Tampermonkey DR results.
- **Rev1.1 — 2026-09-25:** Connects the visible JSON backup function, adds CSV import and safe merge behavior, filters Tampermonkey imports to DR accounts, and previews changes before saving.
- **Rev1.0 — 2026-05-27:** Original standalone countdown tracker. Preserved unchanged for fallback.
