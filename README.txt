28 Auto Tracker v6 PWA safe-area fix

Changes:
- fixes top overlap under iPhone status bar / Dynamic Island when launched from Home Screen
- uses env(safe-area-inset-top/bottom/left/right)
- adds iOS standalone-mode detection fallback
- keeps bottom nav above home indicator
- cache-busts mobile.css/mobile.js with ?v=6
- desktop/Mac baseline remains untouched
