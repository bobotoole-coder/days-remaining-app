# Rev2.7 — 1–100 ranking scores

Released October 29, 2026.

- Whole-number 1–100 score entry, validation, card display and sorting. Blanks sort last.
- Legacy scored accounts convert by multiplying by 10, once. No finer distinctions are fabricated; future assessments can distinguish 43 from 48.
- JSON backup envelope and scored records declare pickupScoreScale: 100. Exact CSV preserves record markers; plain CSV supports Pick Up Score Scale. Unmarked old data is 1–10. Unsupported scales or out-of-range/noninteger scores abort import without saving.
- Separate pick_up_rev27 storage and settings keys. Read-only fallback migration from earlier state; prior keys remain unchanged. Use fresh JSON import as the reliable upgrade method across local files/profiles.
- Historical notes, request snapshots, events and resolution receipts stay unchanged. New submission snapshots include their score scale. No automatic re-evaluation, submission, assignment, deletion, database change or timer reset.
- Preserve original pre-upgrade backup and prior HTML as fallback. Do not use new-scale backups in older apps. JSON is exact recovery; CSV does not carry settings/cleanup ledger. Pending pre-upgrade cleanup must be reverified from a fresh backup if score migration changed its hashed source record.

## Verification

Chromium actual file-picker import of the latest 455-account backup: every account and field equals the original except authorized score conversion and score marker. Settings, resolution ledger, request/event history, countdowns and requestability preserved. Repeated legacy/new JSON import, exact-record CSV import, reload, same-profile close/reopen, fresh JSON restore and predecessor fallback storage checks passed. Representative request workbook generation passed without submission; desktop Excel opening was not tested.

Synthetic tests: 1, 4, 43, 48 and 100 accepted; 0, 101 and fractional scores rejected; blank allowed. Low new-scale scores survive export/reimport unchanged; ascending/descending sorting distinguishes 43 and 48 and puts blanks last. Browser page errors: none. User live upgrade is not performed by these isolated tests.

All prior released HTML files remain unchanged.
