import { MockCreditsProvider } from '../credits/MockCreditsProvider'
import type { PlatformAdapters, PlanTier, SubscriptionPlan, UserProfile } from './types'

let profile: UserProfile = { id: 'guest', state: 'guest', displayName: 'Galaxy Guest', initials: 'GX', plan: 'free' }
const credits = new MockCreditsProvider()

const plans: SubscriptionPlan[] = [
  { id: 'free', capabilities: ['plans.free.1', 'plans.free.2', 'plans.free.3', 'plans.free.4'], action: 'current' },
  { id: 'creator', capabilities: ['plans.creator.1', 'plans.creator.2', 'plans.creator.3', 'plans.creator.4'], action: 'request' },
  { id: 'enterprise', capabilities: ['plans.enterprise.1', 'plans.enterprise.2', 'plans.enterprise.3', 'plans.enterprise.4'], action: 'contact' },
]

export const mockPlatformAdapters: PlatformAdapters = {
  auth: {
    async getCurrentUser() { return profile },
    async signIn() { profile = { id: 'mock-creator', state: 'signed-in-mock', displayName: 'E.X Creator', initials: 'EX', plan: 'creator', email: 'creator@demo.ex' }; return profile },
    async signOut() { profile = { id: 'guest', state: 'guest', displayName: 'Galaxy Guest', initials: 'GX', plan: 'free' }; return profile },
  },
  credits,
  subscription: {
    async getCurrentPlan() { return profile.plan },
    async getAvailablePlans() { return plans },
    async requestUpgrade(plan: PlanTier) { return { accepted: true as const, plan } },
  },
  enterprise: { async submitInquiry() { return { captured: true as const } } },
  profile: { async getProfile() { return profile }, async updateProfile(update) { profile = { ...profile, ...update }; return profile } },
}
