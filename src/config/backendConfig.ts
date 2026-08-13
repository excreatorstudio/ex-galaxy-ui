export type PlatformMode = 'mock' | 'remote'

const requestedMode = import.meta.env.VITE_PLATFORM_MODE

export const backendConfig = {
  mode: requestedMode === 'remote' ? 'remote' : 'mock' as PlatformMode,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT ?? '/auth',
  creditsEndpoint: import.meta.env.VITE_CREDITS_ENDPOINT ?? '/credits',
  subscriptionEndpoint: import.meta.env.VITE_SUBSCRIPTION_ENDPOINT ?? '/subscription',
  enterpriseEndpoint: import.meta.env.VITE_ENTERPRISE_ENDPOINT ?? '/enterprise',
} as const

export const remoteModeNotice = 'Remote platform mode is reserved for a future backend and safely falls back to mock data.'
