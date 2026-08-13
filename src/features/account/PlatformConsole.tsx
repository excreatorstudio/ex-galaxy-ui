import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { featureFlags } from '../../config/featureFlags'
import { useI18n } from '../../i18n'
import { getPlatformService } from '../../services/platform/platformService'
import type { CreditsBalance, CreditsTransaction, SubscriptionPlan, UserProfile } from '../../services/platform/types'
import { useGalaxyStore } from '../../state/useGalaxyStore'

interface Snapshot { profile: UserProfile; balance: CreditsBalance; history: CreditsTransaction[]; plans: SubscriptionPlan[] }

const emptySnapshot: Snapshot = {
  profile: { id: 'guest', state: 'guest', displayName: 'Galaxy Guest', initials: 'GX', plan: 'free' },
  balance: { balance: 0, monthlyAllocation: 0, usageThisMonth: 0, currency: 'E.X Credits' }, history: [], plans: [],
}

function usePlatformSnapshot() {
  const refresh = useGalaxyStore((state) => state.platformRefresh)
  const [snapshot, setSnapshot] = useState<Snapshot>(emptySnapshot)
  useEffect(() => {
    let active = true
    const service = getPlatformService()
    void Promise.all([service.profile.getProfile(), service.credits.getBalance(), service.credits.getHistory(), service.subscription.getAvailablePlans()]).then(([profile, balance, history, plans]) => {
      if (active) setSnapshot({ profile, balance, history, plans })
    })
    return () => { active = false }
  }, [refresh])
  return snapshot
}

export function PlatformActions() {
  const { t } = useI18n()
  const { profile, balance } = usePlatformSnapshot()
  const open = useGalaxyStore((state) => state.openPlatformPanel)
  if (!featureFlags.membershipShowcase) return null
  return <div className="platform-actions">
    {featureFlags.creditsShowcase && <button type="button" className="credits-trigger" onClick={() => open('credits')} aria-label={t('credits.title')}><span>{t('nav.credits', { value: balance.balance ?? '—' })}</span></button>}
    <button type="button" className="account-trigger" onClick={() => open('account')} aria-label={t('nav.account')}><i>{profile.initials}</i><span>{profile.state === 'guest' ? t('account.guest') : profile.displayName}</span></button>
  </div>
}

export function PlatformConsole() {
  const { t } = useI18n()
  const panel = useGalaxyStore((state) => state.platformPanel)
  const presentation = useGalaxyStore((state) => state.presentation)
  const close = useGalaxyStore((state) => state.closePlatformPanel)
  const refresh = useGalaxyStore((state) => state.refreshPlatformData)
  const snapshot = usePlatformSnapshot()
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape' && panel) close() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close, panel])
  if (!panel || presentation) return null

  const signIn = async () => { await getPlatformService().auth.signIn(); refresh() }
  const signOut = async () => { await getPlatformService().auth.signOut(); refresh() }
  const request = async (plan: SubscriptionPlan['id']) => { await getPlatformService().subscription.requestUpgrade(plan); setNotice(t('credits.demo')) }
  const buy = () => setNotice(t('credits.buyNotice'))
  const inquire = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    await getPlatformService().enterprise.submitInquiry({ company: String(values.get('company') ?? ''), name: String(values.get('name') ?? ''), email: String(values.get('email') ?? ''), teamSize: String(values.get('teamSize') ?? ''), useCase: String(values.get('useCase') ?? '') })
    setNotice(t('enterprise.captured'))
    event.currentTarget.reset()
  }

  return <AnimatePresence><motion.div className="platform-console-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) close() }}>
    <motion.aside className={`platform-console glass platform-console--${panel}`} initial={{ opacity: 0, x: 26, y: 8 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: .35, ease: [.16, 1, .3, 1] }} aria-label={t(`${panel}.title`)}>
      <header className="platform-console-header"><div><span>{t('common.demo')}</span><h2>{t(panel === 'subscription' ? 'plans.title' : `${panel}.title`)}</h2></div><button type="button" onClick={close} aria-label={t('account.close')}>×</button></header>
      {panel === 'account' && <AccountPanel snapshot={snapshot} signIn={signIn} signOut={signOut} onSubscription={() => useGalaxyStore.getState().openPlatformPanel('subscription')} />}
      {panel === 'credits' && <CreditsPanel snapshot={snapshot} onBuy={buy} onSubscription={() => useGalaxyStore.getState().openPlatformPanel('subscription')} />}
      {panel === 'subscription' && <SubscriptionPanel snapshot={snapshot} request={request} onEnterprise={() => useGalaxyStore.getState().openPlatformPanel('enterprise')} />}
      {panel === 'enterprise' && <EnterprisePanel submit={inquire} />}
      {notice && <p className="platform-notice" role="status">{notice}</p>}
    </motion.aside>
  </motion.div></AnimatePresence>
}

function AccountPanel({ snapshot, signIn, signOut, onSubscription }: { snapshot: Snapshot; signIn: () => Promise<void>; signOut: () => Promise<void>; onSubscription: () => void }) {
  const { t } = useI18n(); const signedIn = snapshot.profile.state === 'signed-in-mock'
  return <section className="account-panel"><div className="account-identity"><i>{snapshot.profile.initials}</i><div><b>{signedIn ? snapshot.profile.displayName : t('account.guest')}</b><small>{t('account.mock')}</small></div></div><dl className="account-stats"><div><dt>{t('account.currentPlan')}</dt><dd>{t(`plans.${snapshot.profile.plan}`)}</dd></div><div><dt>{t('credits.balance')}</dt><dd>{snapshot.balance.balance ?? '—'}</dd></div></dl>{signedIn ? <div className="console-buttons"><button onClick={onSubscription}>{t('account.upgrade')}</button><button onClick={signOut}>{t('account.signOut')}</button></div> : <div className="console-buttons"><button className="primary" onClick={signIn}>{t('account.signIn')}</button><button onClick={signIn}>{t('account.create')}</button></div>}</section>
}

function CreditsPanel({ snapshot, onBuy, onSubscription }: { snapshot: Snapshot; onBuy: () => void; onSubscription: () => void }) {
  const { t } = useI18n()
  return <section className="credits-panel"><div className="credit-balance"><span>{t('credits.balance')}</span><b>{snapshot.balance.balance ?? 'CUSTOM'}</b><small>{snapshot.balance.currency}</small></div><dl className="account-stats"><div><dt>{t('credits.monthly')}</dt><dd>{snapshot.balance.monthlyAllocation ?? 'CUSTOM'}</dd></div><div><dt>{t('credits.usage')}</dt><dd>{snapshot.balance.usageThisMonth ?? '—'}</dd></div></dl><h3>{t('credits.activity')}</h3><ul className="credit-history">{snapshot.history.map(item => <li key={item.id}><span>{item.label}</span><b className={item.delta < 0 ? 'negative' : ''}>{item.delta > 0 ? '+' : ''}{item.delta}</b><small>{item.at}</small></li>)}</ul><div className="console-buttons"><button className="primary" onClick={onBuy}>{t('credits.buy')}</button><button onClick={onSubscription}>{t('credits.upgrade')}</button></div></section>
}

function SubscriptionPanel({ snapshot, request, onEnterprise }: { snapshot: Snapshot; request: (plan: SubscriptionPlan['id']) => Promise<void>; onEnterprise: () => void }) {
  const { t } = useI18n()
  return <section className="subscription-panel"><p>{t('plans.preview')}</p><div className="plan-grid">{snapshot.plans.map(plan => <article className={`plan-card ${plan.id === snapshot.profile.plan ? 'current' : ''}`} key={plan.id}><span>{t(`plans.${plan.id}`)}</span><h3>{t(`plans.${plan.id}Price`)}</h3><p>{t(`plans.${plan.id}Tagline`)}</p><ul>{plan.capabilities.map(capability => <li key={capability}>{t(capability)}</li>)}</ul>{plan.id === snapshot.profile.plan ? <button disabled>{t('plans.current')}</button> : plan.id === 'enterprise' ? <button onClick={onEnterprise}>{t('plans.contact')}</button> : <button onClick={() => void request(plan.id)}>{t('plans.request')}</button>}</article>)}</div></section>
}

function EnterprisePanel({ submit }: { submit: (event: FormEvent<HTMLFormElement>) => Promise<void> }) {
  const { t } = useI18n(); const capabilities = ['team', 'sharedCredits', 'admin', 'roles', 'workflow', 'library', 'api', 'deployment', 'support']
  return <section className="enterprise-panel"><p>{t('enterprise.description')}</p><ul className="enterprise-capabilities">{capabilities.map(capability => <li key={capability}>✦ {t(`enterprise.${capability}`)}</li>)}</ul><form onSubmit={(event) => { void submit(event) }}><label>{t('enterprise.company')}<input name="company" required placeholder={t('enterprise.placeholderCompany')} /></label><label>{t('enterprise.name')}<input name="name" required placeholder={t('enterprise.placeholderName')} /></label><label>{t('enterprise.email')}<input name="email" required type="email" placeholder={t('enterprise.placeholderEmail')} /></label><label>{t('enterprise.teamSize')}<input name="teamSize" required placeholder={t('enterprise.placeholderTeam')} /></label><label>{t('enterprise.useCase')}<textarea name="useCase" required placeholder={t('enterprise.placeholderUseCase')} /></label><button className="primary" type="submit">{t('enterprise.submit')}</button></form></section>
}
