# Pick Up App — Upgrades & Release History

Last updated: November 13, 2026

**Current released app: Rev2.9.** This is the running feature-request and revision-change document. Planned items below are not implemented. Documentation updates do not create an app release.

## Next release — planned upgrades

Target: next release after Rev2.9 (proposed Rev2.10; not released or scheduled).

| ID | Feature | Requested behavior | Status | Added |
| --- | --- | --- | --- | --- |
| PU-001 | AS# field | Store and display the account's Autonomous System Number (ASN). | Planned | November 6, 2026 |
| PU-002 | AS Rank score | Add an editable whole-number **1–10** score alongside WAVE, IP Transit / DIA, IPv4 leases and Colocation. | Planned | November 6, 2026 |
| PU-003 | Class field | Dropdown with **Netcentric**, **Corporate**, **Enterprise**, matching Compass. | Planned | November 6, 2026 |
| PU-004 | Vertical field | Dropdown using the Compass options transcribed below. | Planned | November 6, 2026 |
| PU-005 | Taken — another rep, no countdown | Record unavailable ownership separately from business-fit rejection; preserve the evaluation and exclude the account from ready/request lists. | Planned | November 11, 2026 |
| PU-006 | Requested-date sorting and display | Sort Requested by request date, newest first or oldest first, and display the weekday and full request date on each account. | Planned | November 11, 2026 |
| PU-007 | Clear Archive confirmation and backup-for-cleanup wording | Remind Bob to save explanatory notes; explain local Archive versus verified Supabase updates/removal; clarify that the cleanup-preparation button downloads the normal JSON backup. | Planned | November 13, 2026 |

### PU-001 — AS#

- An ASN is an identifier, not a score. Unknown remains blank.
- Multiple-ASN representation and entry/display details remain to be settled during implementation; do not discard additional captured ASNs.

### PU-002 — AS Rank (1–10)

- Use the same 1–10 input/display style as the four existing product scores.
- Keep this assessment separate from the **AS# identifier**, the raw **CAIDA ASRank position**, and the existing **overall account score (1–100)**.
- Scoring criteria and any effect on overall ranking are not yet defined. Do not invent a formula or change existing scores.

### PU-003 — Class

Compass choices from Bob's supplied screenshot:

- -- None -- (unset)
- Corporate
- Netcentric
- Enterprise

“Available” is an option-group label in Compass, not an additional class.

The current workbook uses fixed Netcentric Class values. When implementing this feature, explicitly review the account editor and workbook Class mapping so the new saved selection is handled deliberately, without altering historical request snapshots or the supplied form layout.

### PU-004 — Vertical

Compass choices from Bob's supplied screenshot, in displayed order:

- -- None -- (unset)
- ISP - Telco/Cable/Wireless
- Data Center
- Education
- Content Provider / Media
- Application Provider
- Web Hosting
- VoIP
- eCommerce
- Gaming / Gambling
- Social Networking
- Other

### PU-005 — Taken — another rep, no countdown

- Allow an active account awaiting evaluation or ready for review to be marked **Taken — another rep, no countdown** after Bob checks Compass, without requiring a prior pickup request.
- Record the owning rep, the date checked and notes. No countdown displayed means no known countdown; do not substitute zero, invent a timer or restart the normal DR countdown.
- Preserve the existing evaluation/recommendation, scores, notes and request history. Taken is an ownership/availability status, not a business-fit rejection or a manager-denied pickup request.
- Exclude Taken accounts from ready/available and request-selection lists, and report them separately from business rejections in counts and analytics.
- Carry the status and ownership evidence through supported backup/import/export and reconciliation handoffs; represent the observed ownership as TAKEN rather than inferring a REJECT business verdict. Saving locally must not imply that Supabase was updated.
- Retain the existing separate countdown workflow for another-rep accounts with an explicitly supplied Days Remaining value.
- Updated interim guidance (November 13): save a dated TAKEN note, leave the commercial evaluation unchanged, then use local **Archive**. This supersedes the earlier REJECT-on-Save workaround. Preserve notes/history for any records already saved using the earlier workaround, and distinguish ownership-only removals from genuine business rejections; do not automatically reinterpret all rejected records.

### PU-006 — Requested-date sorting and display

- Add **Request date — newest first** and **Request date — oldest first** sorting in Requested.
- Use the recorded submission date of the current request attempt, not the account's Date added, evaluation date or last edit date.
- Display the weekday and full request date clearly on each requested account, without requiring Request history to be expanded.
- Preserve earlier attempts and their dates in Request history. Do not overwrite historical request snapshots.
- Requests without a recorded submission date must display **Unknown — not recorded**, remain accessible, and sort after dated requests in both directions. Never infer a submission date from Date added.
- Preserve request dates and sorting compatibility through supported backup/import/export paths; this is a planned UI upgrade, not a change to account lifecycle or existing submission history.

### PU-007 — Clear Archive confirmation and backup-for-cleanup wording

- This GitHub roadmap is the authoritative development backlog for the next revision. The separate Drive **Pick Up App** document is the plain-English operating guide, not a replacement for this backlog.
- Current wording makes **Prepare Supabase cleanup** sound like an extra task Bob has missed. In Rev2.9, that button calls the normal JSON backup export; the offline app does not connect to Supabase. Bob can send the normal **Backup JSON** without using both buttons.
- Remind Bob to save an explanatory note before archiving. Do not imply that unsaved editor text is automatically captured by Archive.
- Proposed confirmation text:

  > Have you saved a note explaining why you are archiving this company?
  >
  > Archive puts this company aside in the app. It does not delete it or update Supabase.
  >
  > Send Spock your latest Backup JSON as usual. On the next update, Spock will review the reason, update the appropriate Supabase status or separate classification, and verify the retained information. For confirmed eligible removals, Spock will return a cleanup JSON. The full record leaves the app when you import that file.
  >
  > Archive this company now?

- Include concise example notes in nearby help or the confirmation, using placeholders rather than actual customer/rep data:
  - **TAKEN — [rep] owns this company; converted to an Account. No countdown shown. Checked [date].**
  - **FINAL REJECT — I agree with the evaluation and decline this company because [reason]. Confirmed [date].**
  - **ASSIGNED TO ME — Assignment confirmed [date]. Now working as a prospect.**
  - **REGIONAL EXCLUSION — Verified company headquarters in [country/region]. Not a commercial rejection; retain for reconsideration if rules change. Checked [date].**
- Preserve the normal structured final-rejection and assignment controls. Example notes do not replace those controls or turn Archive into an automatic final disposition. Temporary archives and recommendation-only rejects remain unresolved. Regional exclusions remain distinct from REJECT and TAKEN and require supported classification and verified retention before removal.
- Rename **Prepare Supabase cleanup** to a clearer label, such as **Download backup for Spock**, or consolidate it with **Backup JSON** without losing the backup function. Suggested help: **Send this backup to Spock for database updates and any verified cleanup. Import the returned JSON. No separate Supabase task is needed.** Final label/layout can be settled during implementation.
- Acceptance: operator wording clearly distinguishes saving notes, local archiving, sending a backup, verified database processing and importing cleanup. No automatic database connection, deletion, countdown reset, evaluation/status rewrite or bypass of existing cleanup verification is introduced. Preserve records, settings, timers, request history and ledgers. This item is planned wording/help work, not an app release or authorization to perform cleanup now.

## How we maintain this document

1. Bob can send ideas in plain language. Append each idea here with a stable ID, date and status; retain its meaning as details evolve.
2. Keep future work in Planned. Use In progress only once implementation starts. Use Deferred or Dropped with a short reason when that decision is made; retain the record.
3. On a verified release, mark implemented items Released, record the actual revision/date, add the release summary below and link its detailed release notes. Never describe a planned feature as shipped.
4. Preserve existing release files and notes. Record new work in the next revision rather than rewriting historical behavior.
5. Implementation must preserve existing account data, timers, notes, submissions, request snapshots, settings and ledgers, and carry new fields through supported backup/import/export paths. The exact UI and migration details are implementation work, not completed requirements here.

## Released feature history

Summaries below are based on the existing release notes. Those linked notes retain detailed behavior and verification limits. This index covers the Pick Up successor; the README also preserves earlier Days Remaining revisions.

| Revision | Release date | Added or changed | Details |
| --- | --- | --- | --- |
| Rev2.9 | October 31, 2026 | Consistent evaluation counts/filters for saved verdict variants; compact overview product scores and larger expanded scores. | [Release notes](Pick_Up_Rev2.9_Release_Notes.md) |
| Rev2.8 | October 30, 2026 | Four 1–10 product scores; independent 1–100 overall score, grade, leading product and confidence; retained evaluation analytics. Superseded automatic legacy score multiplication. | [Release notes](Pick_Up_Rev2.8_Release_Notes.md) |
| Rev2.7 | October 29, 2026 | 1–100 Pick Up ranking scores and scale markers; one-time legacy conversion as implemented in that revision. See Rev2.8 for successor behavior. | [Release notes](Pick_Up_Rev2.7_Release_Notes.md) |
| Rev2.6 | October 28, 2026 | Denied requests, personal revisit timers and separate Denied / Revisit workflow; visible outcome controls. | [Release notes](Pick_Up_Rev2.6_Release_Notes.md) |
| Rev2.5 | October 26, 2026 | Simpler request-outcome fields, optional/default notes and another-rep countdown handling. | [Release notes](Pick_Up_Rev2.5_Release_Notes.md) |
| Rev2.4 | October 26, 2026 | Verified completed-account cleanup handoff and compact resolution ledger; protection against restoring resolved accounts. | [Release notes](Pick_Up_Rev2.4_Release_Notes.md) |
| Rev2.3 | October 25, 2026 | Explicit PICK UP / REJECT evaluation labels instead of ambiguous PASS wording. | [Release notes](Pick_Up_Rev2.3_Release_Notes.md) |
| Rev2.2 | October 23, 2026 | Clearer readiness/count dashboards, compact account cards, larger selection controls and sticky submission toolbar. | [Release notes](Pick_Up_Rev2.2_Release_Notes.md) |
| Rev2.1 | October 21, 2026 | Record earlier requests without guessed dates; historical outcome handling and positive-countdown visibility fixes. | [Release notes](Pick_Up_Rev2.1_Release_Notes.md) |
| Rev2 | October 21, 2026 | Submission/request lifecycle, working tabs, request outcomes, history/analytics, explicit countdown replacement and persistence fixes. | [Release notes](Pick_Up_Rev2_Release_Notes.md) |
| Rev1 | October 14, 2026 | Pick Up successor to Days Remaining: open/unassigned accounts, optional scores, site/spend fields, warning flags, up-to-three-account Excel forms and saved form headers. | [Release notes](Pick_Up_Rev1_Release_Notes.md) |
