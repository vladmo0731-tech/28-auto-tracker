28 Auto Tracker cloud dashboard v3

ROLLBACK:
Previous cloud build is preserved separately:
  /mnt/data/28-auto-tracker-cloud-supabase.zip
Desktop/Mac v26 is also untouched.

Changes in this experimental build:
- Startup opens Dashboard, not a car.
- Dashboard: inventory, invested, sales, profit, cars in stock, recent activity.
- Dedicated Machines screen.
- Dedicated all-expenses screen.
- Mobile fixed nav: Главная / Машины / Расходы / Аналитика / Настройки.
- Car detail still uses the existing v26 visual design.
- Automatic retry for Supabase "JWT issued at future", including session refresh.
- Service worker uses network-first for page navigation to reduce stale GitHub Pages HTML.
