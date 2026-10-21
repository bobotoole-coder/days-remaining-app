# Rev2 — Pick Up App · October 21, 2026

## Changes

- Three working tabs: **Ready & Upcoming** (default), **All Accounts**, **Requested**. Available accounts precede the next seven calendar days, ranked by manually entered score. Missing scores never hide accounts. Search and evaluation/availability filters are available; inactive filters are disabled in Requested/History.
- Explicit **Needs evaluation**, **Evaluated — incomplete fields**, **Ready to request**, and **Evaluated — not yet available** labels. Existing scored Rev1 records retain their score-based evaluation; new records have an explicit DR recommendation. No automatic scoring formula.
- Select **1, 2 or 3** available, evaluated accounts with complete account-level fields. Generate request downloads the original-format Excel form and never changes state. After actually sending, **Mark submitted** records the date and moves those accounts into Requested. Maximum three individual account submissions per local calendar day across all batches recorded in this browser. The app cannot know submissions not recorded here.
- Requested supports explicit saved resolutions: assigned to me (PROSPECT in History), another rep (new rep and explicitly entered replacement countdown), or still unassigned (required notes/date, collapsed Needs follow-up section with count/due indicators). Explicitly confirm available again to return a follow-up account to active lists. Submission is not assignment.
- History retains rejected/archived accounts, successful and unsuccessful requests, dates, notes and attempts. Requests have stable attempt/batch IDs and submission snapshots; repeated requests never clone the account. Analytics count individual accounts/attempts, with requests by date, assignment outcomes and current pending/follow-up counts.
- REJECT on Save requires confirmation, removes the account from active lists and creates a Magellan reconciliation handoff. PROSPECT assignment also offers a handoff. **There is no Magellan integration; local app actions do not update the database.** Apply and independently verify those writes through the authorized Magellan workflow.
- Archive replaces destructive list removal: the account leaves active lists but remains in History and backups.
- Header edits require **Save form header**. Account edits and resolutions require explicit Save with a visible success message. Storage failures produce NOT SAVED, never a success confirmation.

## Rep/countdown editing investigation

Rev1 prefilled the live days value and compared it to `daysLeft()` at save time. This conflated a displayed computed countdown with an intentional replacement; date rollover or toggling open availability could incorrectly classify the edit. Storage write errors were also caught inside `save()` without signalling failure to its caller. Neither behavior depends on selecting three accounts.

Rev2 uses a **blank optional replacement-countdown field**. Blank preserves `originalDays` and `addedAt` byte-for-byte on enrichment/rep edits. Explicit whole-number replacement days (including the same number or zero) start at today's midnight. Ownership remains a separate explicit control; choose DR when restoring an assigned-rep countdown. The another-rep resolution sets DR automatically. Rep/notes/countdown persistence has been tested after closing and reopening a real persistent browser profile.

This identifies concrete code hazards and verifies the revised behavior; it does not claim a recording of the user's intermittent original failure or guarantee browser storage outside the tested profile.

## Migration and privacy

1. In Rev1, download **Backup JSON** immediately before switching; keep the old app and backup.
2. Download/open Rev2. Use **Import CSV / JSON** with that newest backup. Local HTML paths/profiles may not share storage; automatic fallback access is only a convenience. An inaccessible Rev1 browser store is not a data-loss diagnosis.
3. Check the account count and saved form header; download a fresh Rev2 JSON backup. Continue using the same Rev2 file/path and browser profile. Browser/private-mode clearing can remove local storage.

Rev2 uses separate `pick_up_rev2` / `pick_up_rev2_form` keys; Rev1 keys and every previous released file remain untouched. Exact JSON retains every field, including unknown enrichment, lifecycle and history. Rev2 CSV includes its original human-readable columns plus a full `Rev2 Record JSON` column for exact account/history restoration. JSON is the recommended recovery format and includes form settings. Older JSON and CSV imports remain supported. Import previews additions/updates/skips; importing an older backup is not a substitute for a fresh current export.

The October 21 current 216-account backup was used privately for field-level and countdown migration tests, not bundled in this public repository or release. It has no stored submission-history fields. No request dates or outcomes were guessed. The user's reported two assignments to self / one to another remain unmodified pending account identification. Legacy records explicitly marked requested remain quarantined with unknown dates/outcomes instead of being shown as available.

## Prompt package

Portable DR v2.2 is the single pre-pickup evaluation, scoring and complete-form-preparation prompt. Numeric app values are separated from evidence, assumptions, confidence and source labels in notes. PU is retired separately; complete earlier versions and dependencies are archived. FC Rev3 and RD v3.0 remain unchanged post-assignment workflows. A shared glossary contains prompt names, shortcuts, revisions, inputs, outputs and canonical links.

The private shared Skills library and its existing DR link/index were updated with byte-verified archives before replacement. A portable ZIP/glossary was delivered separately; proprietary prompts/customer evidence are not published in this public repository. No installed OpenClaw skill or other-model deployment is claimed updated.

## Verification

- Current real 216-account backup: every account field and countdown preserved, actual file-picker migration, repeat import idempotency, Rev1 storage fallback.
- Browser tests: 1/2/3-account generation and Mark submitted; over-selection and daily maximum; requested/active placement; all resolution paths, follow-up reopening, repeated attempts without duplicate records, confirmed rejection/handoff, ranking and missing-score visibility.
- Rep-only/enrichment edits preserve countdown anchor; explicit replacement starts a new anchor; close/reopen retains records, notes, settings and history.
- Exact JSON and Rev2 CSV backup/restore; original Rev1 recovery artifact remains unchanged.
- Browser-generated 1/2/3-account Excel files compared independently against the original template: no extra sheets/ZIP parts, unchanged layout, row/column geometry, styles, images and print structure; fixed Class/Status, saved headers, correct numeric MRC, matching clickable URLs, blank unused account blocks, no private notes or app flags in forms. **Structural XML/ZIP verification, not desktop Microsoft Excel opening.**
- Synthetic UI inspected. No browser page errors in regression tests. Test output/backups remain private and outside the repository.

Run:

```sh
NODE_PATH=/path/to/playwright/node_modules CURRENT_BACKUP=/private/current-backup.json TEST_OUTPUT=/private/test-results node tests/verify_rev2.cjs
python3 tests/verify_rev2_workbook.py /private/test-results
```

The original `tests/verify.cjs` and `verify_workbook.py` remain Rev1-specific fallback tests; the Rev2 suite is separate.
