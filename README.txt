28 Auto Tracker — единая web/PWA версия

Desktop:
- основан на Mac/Desktop v26;
- desktop-разметка и стили v26 не меняются;
- mobile.css применяется только до 900px;
- mobile.js на desktop сразу прекращает работу и не меняет DOM.

iPhone:
- открывайте GitHub Pages URL в Safari;
- Share → Add to Home Screen;
- после этого приложение запускается как standalone PWA.

GitHub Pages:
1. Загрузите ВСЕ файлы этой папки в корень repository.
2. Settings → Pages.
3. Deploy from a branch → main → /root.
4. Откройте выданный HTTPS URL.

Важно:
данные пока сохраняются в localStorage конкретного браузера.
Для общей синхронизации Mac ↔ iPhone нужен следующий шаг: облачная база (Supabase/Firebase).
