# Rev2.4 — Pick Up App — October 26, 2026

## Completed accounts

The working app is for unresolved accounts, including available/DR accounts, undecided evaluations, pending requests and follow-ups. Final rejections and confirmed assignments to Bob can leave the app after their full records are saved and independently read back in Supabase. Archive alone still only hides a local account; it is not database storage or deletion. An evaluation recommendation is not automatically a final decision.

The **Prepare Supabase cleanup** button downloads an exact backup for Spock. It does not upload, contain credentials, call an API or remove records. Spock must reconcile final dispositions, preserve all account fields/notes/events/request history and available packet/research/evaluation/contact-restriction evidence in private Supabase records, then independently read back the saved data. Only then does Spock return a cleanup JSON with matching per-entry hashes and database references.

Importing that file removes matching full account records in one local-storage write with a compact resolution ledger. The ledger retains identity, final verdict, verification references and request-outcome/date summaries, not full notes or research. Existing request analytics and daily submission counts include these summaries. History shows which full records are in Supabase.

Changed local records block removal, as do invalid or conflicting receipts. Failed account-state storage writes retain the original state. Old JSON/CSV imports, manual additions and edits cannot recreate identities recorded in the ledger. Receipts are an operator-generated verification record, not a cryptographic signature or a live database query by the offline app. Import only the cleanup file returned for your backup. Ordinary backups remain importable without removing completed accounts.

## Upgrade and recovery

1. In the current app, download **Backup JSON** and retain it unchanged.
2. Open Rev2.4, import the backup, and verify the account total, form header and representative records. Merely opening Rev2.4 does not clean any records.
3. Send a fresh backup to Spock for actual database reconciliation and cleanup.
4. Import the returned verified cleanup JSON. Check the working count and History analytics; make a new Backup JSON.
5. Continue with the same Rev2.4 file/path and browser profile. Preserve the previous HTML and original backup as fallback.

Rev2.4 has separate account/settings keys; predecessor keys are read as fallback but not overwritten. Browser access to storage across local HTML paths is not guaranteed, so explicit backup/import is the reliable migration. JSON includes the ledger and is the exact recovery format. CSV remains interchange, not ledger recovery. Restoring the old app requires its original pre-cleanup backup; an old app cannot preserve Rev2.4's ledger. Keep all previous HTML releases.

## Verification

Isolated Chromium checks use a 320-account real backup for field preservation and synthetic receipts for 13 candidate records. These are test removals, not final business decisions or live Supabase writes. Verified predecessor-key fallback and preservation, unchanged remaining fields/timers, matching browser/operator canonical SHA256, changed-record removal refusal, invalid/conflicting receipts, atomic storage-failure behavior, exact request analytics and quota counts, repeated import, legacy resurrection prevention, JSON export/restore including settings and ledger, same-profile close/reopen, empty-working-set backup and no page errors.

Current live app migration and actual cleanup require a fresh backup from Bob. No database credentials, private account backups or test outputs are published in this repository.
