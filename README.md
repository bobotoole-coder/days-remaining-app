# Pick Up App (formerly Days Remaining)

Current release: [Rev2.1 — Pick Up App](Pick_Up_Rev2.1_2026-10-21.html)

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
