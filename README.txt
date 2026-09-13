28 Auto Tracker STABLE v13 — stale resync fix

Based on STABLE v12.

Root cause:
- after a successful add/edit/delete, the UI updated correctly
- then the app reloaded the entire cloud state a few seconds later
- that early cloud query could return an older/stale snapshot
- the stale snapshot replaced local state, so the new item disappeared
- a later manual refresh showed the item because the cloud state had caught up

Fix:
- after successful mutations, keep the confirmed local state
- do NOT immediately reload the whole cloud dataset
- Supabase insert/update/delete result is treated as confirmed
- normal page/app load still reads the latest cloud data
- applies to both desktop and mobile
