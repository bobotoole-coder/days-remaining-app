# Days Remaining App

Current release: `Days_Remaining_Rev1.1_2026-09-25.html`

## What it does

The Days Remaining App is a standalone browser-based account countdown tracker.
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
- Import only `DR` rows from a Tampermonkey result and ignore all other statuses.
- Merge by saved ID, normalized company domain, Compass URL, or company name to avoid duplicates.
- Preview add/update/skip counts before an import changes browser storage.

## How to use it

Download the current HTML file and open it in a web browser. No installation or
server is required.

Use **Backup JSON** for an exact restorable backup. Use **Export CSV** for a
spreadsheet or for the Compass merge workflow. **Import CSV / JSON** accepts
both formats. Tampermonkey CSV rows require a valid `Days Remaining` value;
non-DR statuses are ignored.

## Data and privacy

Account data is stored in the browser's local storage. This repository contains
only the empty application and documentation; it must not contain exported
account records or other private business data.

## Versioning

Every released version is preserved. Normal changes will create Rev1.1, Rev1.2,
and so on. A major redesign will move to Rev2.0 only when deliberately approved.

## Release history

- **Rev1.1 — 2026-09-25:** Connects the visible JSON backup function, adds CSV import and safe merge behavior, filters Tampermonkey imports to DR accounts, and previews changes before saving.
- **Rev1.0 — 2026-05-27:** Original standalone countdown tracker. Preserved unchanged for fallback.
