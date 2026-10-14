# Pick Up Rev1 — October 14, 2026

Successor to Days Remaining Rev1.3 in the same repository. All four previous
HTML releases, their tags and history remain unchanged.

## Approved scope

Implements Bob's October 14 requirements, not the earlier unreviewed pool,
automation or lifecycle proposal. No scoring formula, research automation,
submission automation, ownership assignment, account removal on export, or
DR/RD skill changes are included.

## Changes

- Open/unassigned accounts always sort ahead of DR records, regardless of chosen
  sort order, and display zero days/no waiting period. Legacy accounts remain
  DR countdown records unless explicitly changed. Being unassigned is not
  proof of clearance; ON HOLD and HAS DUPLICATES remain visible separately.
- Optional editable integer Pick Up Score, 1–10, with ascending/descending sort.
  Blank means not scored. Within each ownership group, unscored accounts sort
  last for both score directions. No score is calculated automatically.
- HQ Location, North American City/State, number of locations, number of on-net
  locations, and monthly Addressable Spend ($ MRC). Location counts accept text
  such as `12+` or `2 confirmed`; spend accepts a non-negative dollar amount.
- Independent ON HOLD and HAS DUPLICATES checkboxes, preserved in JSON and CSV.
  These warnings do not change ownership or bypass duplicate-record protection.
- Select one to three accounts and export a pickup workbook. Selection order
  determines the form's company order. Selection is temporary, not a daily
  submission counter. Repeated export is allowed and changes no account data.
- Saved manager/team/AM name/AM type and manually editable current account count.
  The template's example count is deliberately not a default. Header settings
  are included in JSON backups; CSV exports contain accounts only.
- Workbook Class is always `Netcentric`; Status is always `Prospect`. Neither
  is a new account input. Unused account slots are cleared.

## Excel template preservation

Source: Bob's supplied October 13 draft workbook (SHA-256
`b80b99b172c6e5cf4d9fe16ff706dff90fdea2797ae57735060d255f988884b4`).
The embedded copy clears example company values, stale company hyperlink targets,
example count, unused shared strings and document author metadata. It preserves
all template labels, notes, dimensions, row/column properties, cell styles,
print settings, drawing, example image and sheet structure. The template's own
instructions/example image remain exactly as supplied; no application notes,
scores, ownership or flags are added to the form.

Export changes the existing B3:B7 header cells and B-column company cells in the
three existing blocks. It updates the actual clickable Compass hyperlink targets,
not just their displayed text. There are no added columns, rows or sheets. MRC
and current count are written as numeric cells. Text is written as text, never
as Excel formulas. fflate 0.8.2 (MIT) is embedded for offline ZIP/XLSX handling.

## Data compatibility and recovery

- All original company, website, Compass, rep, notes, add/edit/delete actions,
  urgency statistics, five legacy sort choices, calendar-day countdowns,
  duplicate checks, CSV import/export and JSON backup functions are retained.
- The new storage key is `pick_up_rev1`. On first use, the app reads the old
  `days_remaining_v2` key if visible in the same browser context, without
  overwriting that key. New writes go to the new key only. Local HTML storage
  availability depends on browser/profile/file location; do not assume the new
  file can automatically see the old file's storage.
- Reliable transfer: make a JSON backup in the old app, open the new HTML file,
  and import the JSON using **Import CSV / JSON**. Keep the old HTML and backup
  intact. Use the same new HTML file and browser profile afterward, and make a
  fresh JSON backup after import.
- JSON is the exact account/header recovery format. Legacy object-with-entries
  and array backups import; extra/unknown account fields survive. Import retains
  the existing domain/Compass/name/ID matching and preview/confirmation workflow.
  Repeated import is idempotent. Old-format feeds do not erase new enrichment.
  As before, importing into a populated list is a merge, not a destructive reset.
  For exact recovery into an empty list, import a JSON backup in a fresh browser
  profile. Do not use CSV as the exact backup format.
- Score/flag/location/notes edits leave originalDays and addedAt unchanged unless
  the displayed Days Left itself is changed. An explicit days edit restarts the
  anchor at today's local midnight, preserving the original app's behavior.
  Open mode displays zero without overwriting a pre-existing stored DR anchor;
  returning to DR mode resumes the underlying countdown.
- CSV retains all eight original columns in their original order, appends the
  new fields and exact added-at timestamp, and now preserves multiline notes.
  Legacy CSV exports remain importable. JSON is still preferred for recovery.
- Compass/Tampermonkey CSV still imports valid DR results and ignores irrelevant
  statuses. It additionally accepts explicit `Pick Up`, `OPEN`, or `UNASSIGNED`
  rows as open accounts with zero days. No other status implies availability.
- Calendar-day changes are refreshed while the page remains open. Nothing is
  submitted, assigned, deleted or written to Compass/Magellan by export.

## Verification performed

Headless Chromium / Playwright, opening the actual standalone HTML via `file://`:

- Bob's October 12 JSON backup: **159 of 159 accounts**, every original property,
  multiline notes, IDs, originalDays and addedAt preserved; countdowns compared
  with Rev1.3. Original backup file was never edited or published.
- Actual file-picker JSON import; repeated-import idempotency; old CSV import;
  new CSV notes/timestamp round trip; exact new JSON restore including headers.
- Score/flag edit without date reset; flags independent of ownership; all sort
  choices; open-first ordering; manual duplicate add/edit blocking; DR/open feed
  filtering; four-checkbox attempt limited to three.
- Real browser download of 1-, 2-, and 3-account XLSX files; account data unchanged
  after each export. Independent Python ZIP/XML comparison against the original
  supplied workbook checks template parts, styles, rows, print settings, images,
  fixed form values, header count, numeric MRC, clickable targets, blank unused
  blocks and absence of extra application fields/stale account examples.
- Browser closed and relaunched with the same persistent profile: accounts and
  header settings persisted. No page JavaScript errors.

These checks do not claim a visual open in desktop Excel, nor migration of Bob's
live browser profile. Bob's original app/live data remain untouched.

## Re-run checks

With Playwright installed and Chromium available:

```sh
NODE_PATH=/path/to/node_modules node tests/verify.cjs
python3 tests/verify_workbook.py /path/printed/by/browser/test
```

Optional `LEGACY_JSON`, `LEGACY_CSV`, and `TEST_OUTPUT` environment variables let
an operator test private backups outside the repository. An optional second
argument to the Python check compares with the original October 13 workbook;
otherwise the sanitized bundled template is used. Never commit account backups
or test downloads. The checked-in fixture data are synthetic only.
