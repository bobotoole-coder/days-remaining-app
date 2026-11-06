# Pick Up App — Upgrades & Release History

Last updated: November 6, 2026

**Current released app: Rev2.9.** This is the running feature-request and revision-change document. Planned items below are not implemented. Documentation updates do not create an app release.

## Next release — planned upgrades

Target: next release after Rev2.9 (proposed Rev2.10; not released or scheduled).

| ID | Feature | Requested behavior | Status | Added |
| --- | --- | --- | --- | --- |
| PU-001 | AS# field | Store and display the account's Autonomous System Number (ASN). | Planned | November 6, 2026 |
| PU-002 | AS Rank score | Add an editable whole-number **1–10** score alongside WAVE, IP Transit / DIA, IPv4 leases and Colocation. | Planned | November 6, 2026 |
| PU-003 | Class field | Dropdown with **Netcentric**, **Corporate**, **Enterprise**, matching Compass. | Planned | November 6, 2026 |
| PU-004 | Vertical field | Dropdown using the Compass options transcribed below. | Planned | November 6, 2026 |

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
