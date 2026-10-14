# Pick Up App (formerly Days Remaining)

Current release: [Rev1 — Pick Up App](Pick_Up_Rev1_2026-10-14.html)

[Download Pick Up Rev1](https://github.com/bobotoole-coder/days-remaining-app/releases/download/pick-up-rev1/Pick_Up_Rev1_2026-10-14.html)

Standalone HTML, including offline Excel export. Download and open in your browser.

## Pick Up Rev1 additions

- Open/unassigned accounts at the top with zero waiting days; existing DR countdowns retained.
- Editable 1–10 Pick Up Score and score sorting; no automatic formula.
- HQ and North American City/State, location/on-net counts and monthly MRC spend.
- Independent ON HOLD / HAS DUPLICATES flags.
- Select up to three accounts and export the supplied October 13 Excel form,
  preserving its layout without extra fields or sheets.
- Saved manager/rep headers and manually editable current account count.
- Export does not submit, assign or remove accounts. No DR/RD skill changes.

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

Every released version is preserved. Normal changes will create Rev1.1, Rev1.2,
and so on. A major redesign will move to Rev2.0 only when deliberately approved.

## Release history

- **Pick Up Rev1 — 2026-10-14:** Backward-compatible successor to Days Remaining Rev1.3. Adds manually scored open-account selection and exact-template Excel pickup forms. Prior releases unchanged.

- **Rev1.3 — 2026-09-26:** Restores strict duplicate protection across manual adds, edits, CSV imports, JSON restores, and Tampermonkey imports. Supersedes Rev1.2 for normal use.
- **Rev1.2 — 2026-09-26:** Preserves the exact row count and repeated-domain records when restoring full Days Remaining CSV or JSON data, while retaining domain-based merging for new Tampermonkey DR results.
- **Rev1.1 — 2026-09-25:** Connects the visible JSON backup function, adds CSV import and safe merge behavior, filters Tampermonkey imports to DR accounts, and previews changes before saving.
- **Rev1.0 — 2026-05-27:** Original standalone countdown tracker. Preserved unchanged for fallback.
