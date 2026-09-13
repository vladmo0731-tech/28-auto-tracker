28 Auto Tracker STABLE v12 — instant optimistic UI

Based on STABLE v11.

Fixes:
- New expense appears on screen BEFORE waiting for Supabase.
- If expense save fails, the optimistic row is automatically removed.
- New car appears immediately before the insert request finishes.
- If car save fails, the optimistic car is rolled back.
- Photo signed URLs are now loaded in parallel instead of one-by-one.
- Background reconciliation is delayed so it cannot interfere with the immediate UI update.
- Applies to both desktop and mobile.

Rollback point remains STABLE v10/v11.
