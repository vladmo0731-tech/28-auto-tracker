28 Auto Tracker STABLE v11 — immediate UI updates

Based strictly on STABLE v10.

Fix:
- New expense appears instantly after Supabase insert succeeds.
- Deleted expense disappears instantly.
- New car appears instantly after insert succeeds.
- Edited car updates instantly.
- Sold / Undo Sold updates totals instantly.
- Deleted car disappears instantly.
- Cloud data is reconciled in the background after the immediate UI update.

Applies to BOTH desktop and mobile because the fix is in shared application state/JS,
not in mobile-only styling.

v10 checkpoint remains preserved for rollback.
