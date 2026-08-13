import { beforeEach, describe, expect, it } from 'vitest'
import { backendConfig } from '../config/backendConfig'
import { featureFlags } from '../config/featureFlags'
import { galaxyConfig } from '../config/galaxyConfig'
import { sceneTransitionConfig } from '../config/sceneTransitionConfig'
import { creditsConfig } from '../features/credits/creditsConfig'
import { dictionaries, translate } from '../i18n'
import { getInitialLocale, localeStorageKey, persistLocale, resolveLocale } from '../i18n/localeStore'
import { supportedLocales } from '../i18n/localeTypes'
import { getPlatformService } from '../services/platform/platformService'
import { useGalaxyStore } from '../state/useGalaxyStore'

describe('v1.2 Showcase+ internationalization', () => {
  beforeEach(() => { localStorage.clear(); useGalaxyStore.getState().reset() })

  it('keeps all four dictionaries complete against the English stable-key source', () => {
    const keys = Object.keys(dictionaries.en)
    supportedLocales.forEach(locale => expect(Object.keys(dictionaries[locale]).sort()).toEqual(keys.sort()))
  })

  it('falls back to English for a missing key and preserves product names', () => {
    expect(translate('ja', 'missing.showcase.key')).toBe('missing.showcase.key')
    expect(translate('ko', 'modules.cloud.name')).toBe('Ernest Cloud')
    expect(translate('zh-TW', 'nav.credits', { value: 480 })).toContain('480')
  })

  it('persists a selected locale and maps language suggestions consistently', () => {
    persistLocale('ja')
    expect(localStorage.getItem(localeStorageKey)).toBe('ja')
    expect(getInitialLocale('en-US')).toBe('ja')
    localStorage.clear()
    expect(getInitialLocale()).toBe('zh-TW')
    expect(resolveLocale('zh-HK')).toBe('zh-TW')
    expect(resolveLocale('zh-CN')).toBe('zh-TW')
    expect(resolveLocale('ja-JP')).toBe('ja')
    expect(resolveLocale('ko-KR')).toBe('ko')
    expect(resolveLocale('fr-FR')).toBe('en')
  })

  it('changes language without changing the Galaxy phase, camera transition state, or selected module', () => {
    const store = useGalaxyStore.getState(); store.completeLoading(); store.awaken(); store.focus('video-studio')
    const before = useGalaxyStore.getState(); store.setLanguage('ko')
    expect(useGalaxyStore.getState()).toMatchObject({ language: 'ko', phase: before.phase, selectedModule: before.selectedModule, sceneTransition: before.sceneTransition })
  })
})

describe('v1.2 Showcase+ platform adapters', () => {
  beforeEach(async () => { await getPlatformService().auth.signOut(); useGalaxyStore.getState().reset() })

  it('supports guest and mock-member account states without real authentication', async () => {
    const auth = getPlatformService().auth
    expect((await auth.getCurrentUser()).state).toBe('guest')
    expect((await auth.signIn())).toMatchObject({ state: 'signed-in-mock', plan: 'creator' })
    expect((await auth.signOut()).state).toBe('guest')
  })

  it('returns centralized mock credits, history, and plan previews', async () => {
    const service = getPlatformService(); const balance = await service.credits.getBalance(); const history = await service.credits.getHistory(); const plans = await service.subscription.getAvailablePlans()
    expect(balance.monthlyAllocation).toBe(creditsConfig.plans.creator.monthlyAllocation)
    expect(history.length).toBeGreaterThan(0)
    expect(plans.map(plan => plan.id)).toEqual(['free', 'creator', 'enterprise'])
  })

  it('captures enterprise inquiries only in mock mode and safely keeps remote reservation non-networked', async () => {
    const result = await getPlatformService().enterprise.submitInquiry({ company: 'Example', name: 'Demo', email: 'demo@example.com', teamSize: '20', useCase: 'Showcase' })
    expect(result.captured).toBe(true)
    expect(backendConfig.mode).toBe('mock')
    expect(getPlatformService()).toBeDefined()
  })

  it('uses centralized feature flags and closes showcase panels on Galaxy restart while retaining locale', () => {
    expect(featureFlags).toMatchObject({ multiLanguage: true, membershipShowcase: true, creditsShowcase: true, subscriptionShowcase: true, enterpriseShowcase: true, realAuthentication: false, realBilling: false, remoteBackend: false })
    const store = useGalaxyStore.getState(); store.completeLoading(); store.awaken(); store.setLanguage('ja'); store.openPlatformPanel('credits'); store.restartGalaxyExperience()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', platformPanel: null, language: 'ja' })
  })

  it('does not allow account panels to survive Presentation Mode start', () => {
    const store = useGalaxyStore.getState(); store.completeLoading(); store.awaken(); store.openPlatformPanel('account'); store.startPresentation()
    expect(useGalaxyStore.getState()).toMatchObject({ phase: 'loading', presentation: true, platformPanel: null })
  })
})

describe('v1.2 baseline compatibility', () => {
  it('keeps the 4.2 second Loading sequence and 900ms / 560ms spatial timeline', () => {
    expect(galaxyConfig.loadingDurationMs).toBe(4200)
    expect(sceneTransitionConfig.normal).toMatchObject({ durationMs: 900, commitMs: 560 })
  })
})
