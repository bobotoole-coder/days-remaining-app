# Rev2.6 — denied requests and personal revisit timers

Released October 28, 2026. Rev2.5 and every earlier release remain unchanged.

## Record a denial

In Requested, expand **Update request outcome** directly on the card (no longer hidden inside Account details & notes). Choose **Request denied — set revisit timer**, enter the denial reason and your own number of calendar days, then Save outcome. Zero means revisit today. Notes are optional; reason and timer are required.

The account moves to **Denied / Revisit**. A personal revisit date is separate from the original Compass/DR timer: it does not reset the original countdown, change the rep, infer assignment or availability, reject the prospect, submit a request, or write to Magellan.

## When the timer expires

The account remains Denied, excluded from Available now totals, ordinary active lists and request selection. Ready & Upcoming shows it separately under **Revisit due — previously denied**. Its card retains the reason, denial date, original request and evidence, personal revisit date, and previous attempts. Denied / Revisit contains both upcoming and due records, and permits restarting the personal timer.

After checking Compass and discussing timing with Alex, use **Availability checked — return to active** and confirm. Only this explicit action returns it to active/open status. It still needs the usual evaluation and complete fields to request. A prominent PREVIOUSLY DENIED badge remains, and submitting again appends a new attempt without overwriting the denial. Timer expiry is a review reminder, not confirmation of availability or approval.

**Request denied is not REJECT account.** Existing assignments, reassignment countdowns, follow-up outcomes and completed-account cleanup remain separate. No existing follow-up is automatically reclassified as denied.

## Upgrade and recovery

1. In your current app, download a fresh **Backup JSON**.
2. Open **Rev2.6** and import that fresh JSON.
3. Check the account count and saved form header, then download a fresh Rev2.6 JSON backup.

Use that same new file/path and browser profile afterward. Existing storage keys and state format are retained, but different file paths/profiles may not share browser storage. Backup/import is the reliable transfer route. JSON is exact recovery; CSV is interchange. Keep Rev2.5 and the pre-upgrade JSON as fallback; use Rev2.6 to restore new denial/timer backups because older releases cannot operate the new workflow. The application contains no customer records.

## Verification

Browser tests cover the real current backup supplied privately (every entry, settings and ledger preserved), actual picker import and repeat import, export, fresh restore, reload and browser restart. Synthetic tests cover required reason/timer validation, denial versus account rejection, personal countdown, expiry presentation, exclusion from available counts and selection, timer rescheduling, manual reopen, retained original submission/snapshot, append-only repeated attempts and exact restore of new denial backups. Existing assigned-to-me, assigned-to-other, still-unassigned and confirmed-available actions are exercised, including ordinary 120/21/7/0-day countdowns. Public test code contains synthetic examples only; no private backup or test export is committed.

Test-profile results do not establish that Bob has upgraded his live browser file. No live data or Magellan write is performed during release testing.
