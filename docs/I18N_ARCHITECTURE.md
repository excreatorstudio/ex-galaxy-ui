# Internationalization Architecture — v1.2 Phase 1

## Supported locales

- `zh-TW` — Traditional Chinese
- `en` — English
- `ja` — Japanese
- `ko` — Korean

`src/i18n/dictionaries/en.ts` is the canonical stable-key inventory. Each locale dictionary is complete against that key set. `translate()` falls back to English and then returns the key, so a missing string remains diagnosable without breaking the interface.

## Resolution and persistence

`localeStore.ts` reads `ex-galaxy.locale` through guarded localStorage access. A stored supported locale wins; unavailable storage safely defaults to `zh-TW`. The optional browser-language mapping helper maps `zh-*` to `zh-TW`, `ja-*` to `ja`, `ko-*` to `ko`, and other languages to `en` for any future locale-suggestion surface. Storage failures are non-fatal.

`useI18n()` changes only the locale. It never changes Galaxy phase, selected module, Camera, or scene-transition state. Presentation Mode retains the chosen language and never changes it automatically.

## Content rules

Brand and product names remain original where required: E.X Galaxy, Ernest Video Autopilot, E.X Realty Operations Hub, E.X Learning & Knowledge Hub, and E.X Voice Studio. Descriptive and operational text uses translation keys.
