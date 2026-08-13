# Platform Adapter Architecture — v1.2 Phase 1

## Boundary

All commercial showcase UI uses `getPlatformService()` rather than direct mock JSON. The adapter interface contains:

- `AuthAdapter`: current user, mock sign in, mock sign out
- `CreditsAdapter`: balance, history, estimate, consume, add credits
- `SubscriptionAdapter`: current plan, plan inventory, upgrade request
- `EnterpriseAdapter`: demo inquiry capture
- `UserProfileAdapter`: profile read/update

## Current mode

`backendConfig.mode` defaults to `mock`. `VITE_PLATFORM_MODE=remote` is accepted as a reservation only; it produces the mock service and a development warning rather than a request. Endpoint settings (`API_BASE_URL`, auth, credits, subscription, enterprise) remain configuration placeholders.

This preserves GitHub Pages compatibility: Vite uses relative static asset paths (`./`), and no SSR, Node runtime, filesystem access, API key, external request, database, or payment dependency is required.

## Future integration

Ernest Shared Services / Cloud Backend can replace adapters after formal API contracts, authentication, authorization, data-retention, and billing decisions are approved. UI components should not need to change.
