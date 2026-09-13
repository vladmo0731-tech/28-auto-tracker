28 Auto Tracker STABLE v14 — dedicated expense section rendering

Based on STABLE v13.

Observed behavior:
- sidebar totals updated after adding an expense
- expense list itself did not refresh until page reload

Fix:
- added renderCurrentExpenseSection()
- expense rows are rebuilt independently from the full page render
- expense KPIs and summary totals are updated independently
- add/delete expense explicitly call this renderer
- full render is wrapped so an unrelated rendering error cannot prevent the
  expense list from refreshing
- applies to desktop and mobile
