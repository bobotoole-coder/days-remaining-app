# Pick Up Rev2.8 — October 30, 2026

Four product scores (1–10): WAVE, IP Transit / DIA, IPv4 leases, Colocation. Independent overall account score (1–100), calculated letter grade, leading product, confidence, verdict and short reason. Overall score controls score sorting; new ranked accounts sort ahead of unranked legacy accounts. No inferred conversion of old scores.

Built from the supplied Rev2.6, whose Git blob matches the repository exactly. Supersedes Rev2.7 automatic score multiplication. Existing pickupScore fields and snapshots remain unchanged and clearly labeled Legacy, including explicit /100 markers from Rev2.7. New overallScore is separate.

Preserves countdowns, settings, submission checks, workbook generation, requests/events, duplicate protection and verified Supabase cleanup. New local storage keys leave predecessor storage untouched. Import the latest JSON backup in the new HTML when upgrading local files. Do not use new backups in older apps.

Evaluation summaries are retained independently after full records are removed, exported in JSON, and restored by JSON import. Analytics show recorded verdict counts, pickup rate, grades, leading products and legacy/unranked counts. Unrecorded historical evaluations are not invented. CSV supports the new fields/verdict and retains exact record JSON; JSON remains the full recovery format, including ledgers/settings.

## Validation

Syntax and isolated JavaScript runtime checks passed with the supplied backup: all 455 entries and 16 resolution receipts preserved exactly, including settings; storage fallback and repeated saves do not rescale scores. Checked grade boundaries, score ranges, 49 versus 40 ordering, legacy separation, form reader, cards, analytics and evaluation-summary retention. A live browser rendering test was unavailable because this runtime has no Chromium executable. User live storage was not accessed or modified. Test source accepts PICKUP_BACKUP pointing to a local backup; no account data is committed to this public repository.

## Upgrade

Open Pick_Up_Rev2.8_2026-10-30.html. Use Import Backup to select the original latest JSON backup. Confirm 455 working accounts and 16 retained completed records. Keep the old HTML and original JSON as fallback. Enter new evaluations in Edit; new overall score and grade appear prominently on each card.
