# FairNote Agent Rules

These rules apply to Codex, Claude Code, and other coding agents working in this repository.

## Product rules

- FairNote supports all trade fairs and is strongest for overseas sourcing.
- The initial user is a solo purchasing or product-planning professional.
- Users must be able to start and save records without an account.
- Every capture field is optional; never block saving because a text field is empty.
- Common capture includes item photos, business-card photos, price, delivery, packaging, contact, and notes.
- Keep Korean, English, and Simplified Chinese in sync.
- Do not add AI or OCR in the initial product.
- Never show ads on onboarding or capture/edit screens.

## Data safety

- Local save must succeed independently of network state.
- Preserve existing IndexedDB data and add a backup before any migration.
- Migrations must be idempotent and covered by E2E tests.
- Do not re-enable the legacy GitHub PAT/PIN sync.
- Never clear local data before a remote replacement is safely verified.
- Photos belong in local blob/media storage or object storage, never in Firestore documents.

## Engineering

- Run `npm run check` before handing work off.
- Add or update Playwright coverage for user-visible behavior.
- Keep static deploy assets under `public/`.
- Preserve the GitHub Pages base path `/canton-fair-app/`.
- Prefer small modules over adding more logic to the legacy inline script.
- New domain behavior should be implemented in `src/` with unit tests where practical.

## Current direction

- Visual system: Field Ledger — warm ivory paper, deep ink, vermilion accent.
- Runtime: Vite PWA, later packaged with Capacitor for Android and iOS.
- Planned sync: optional account connection using Firebase Auth, Firestore, and Cloud Storage.
