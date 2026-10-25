# Rev2.3 — Pick Up App — October 25, 2026

Replaces the ambiguous evaluated PASS label with **Evaluated: YES — REJECT**. Completed positive recommendations explicitly show **PICK UP** before their readiness/countdown details. Incomplete evaluation messages remain unchanged.

This changes labels only. Existing pickup/reject values, lifecycle, timers, notes, settings, request history, filters and submission rules are unchanged. A displayed REJECT recommendation does not automatically archive the account or write a final Magellan disposition. Existing manual Save confirmation behavior is unchanged.

## Upgrade

1. In the current app, download a fresh **Backup JSON**.
2. Open Rev2.3 and import that backup; verify the account total and form header.
3. Keep Rev2.2 and the original backup as fallback. Continue using the same new file/path and browser profile.

JSON is the exact recovery format; CSV is the interchange format. Different local HTML paths/profiles may not share storage. The isolated browser verification is not proof of migration in Bob’s live browser.

## Verification

Browser verification uses the existing 320-account evaluated backup, exact entry/settings comparisons, repeat import, same-path/profile browser restart, backup re-export, fresh-profile restore, and prior-version recovery. All earlier HTML releases remain preserved. No private backup or test outputs are included in the repository.
