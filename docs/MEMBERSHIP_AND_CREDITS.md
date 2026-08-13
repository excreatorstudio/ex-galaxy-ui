# Membership and Credits Showcase — v1.2 Phase 1

This is a static presentation layer, not a commercial billing system.

## Account model

- Account state: `guest` or `signed-in-mock`
- Plan tier: `free`, `creator`, or `enterprise`
- Mock sign-in changes only an in-memory profile and never validates credentials.

## E.X Credits

`creditsConfig.ts` centralizes display values: Free shows 100 monthly credits, Creator shows 1,500 monthly credits and a 480 showcase balance, while Enterprise uses a custom pool. The mock provider exposes balance, history, estimate, consume, and add APIs for a future remote replacement.

Buy Credits, Upgrade, and all pricing controls are explicitly demo actions. No price, payment method, checkout, or billing request is included.

## Subscription preview

Free, Creator, and Enterprise appear as a dark glass License Console. The UI only states `Free`, `Coming Soon`, or `Contact Us`; it does not claim production pricing or entitlement enforcement.
