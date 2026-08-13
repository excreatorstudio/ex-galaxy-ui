export type AccountState = 'guest' | 'signed-in-mock'
export type PlanTier = 'free' | 'creator' | 'enterprise'
export type PlatformPanel = 'account' | 'credits' | 'subscription' | 'enterprise'

export interface UserProfile { id: string; state: AccountState; displayName: string; initials: string; plan: PlanTier; email?: string }
export interface CreditsBalance { balance: number | null; monthlyAllocation: number | null; usageThisMonth: number | null; currency: string }
export interface CreditsTransaction { id: string; label: string; delta: number; at: string; kind: 'allocation' | 'workflow' | 'bonus' }
export interface CreditEstimate { feature: 'image' | 'video' | 'voice' | 'render'; cost: number }
export interface SubscriptionPlan { id: PlanTier; capabilities: string[]; action: 'current' | 'request' | 'contact' }
export interface EnterpriseInquiry { company: string; name: string; email: string; teamSize: string; useCase: string }

export interface AuthAdapter { getCurrentUser(): Promise<UserProfile>; signIn(): Promise<UserProfile>; signOut(): Promise<UserProfile> }
export interface CreditsAdapter { getBalance(): Promise<CreditsBalance>; getHistory(): Promise<CreditsTransaction[]>; estimate(feature: CreditEstimate['feature']): Promise<CreditEstimate>; consume(feature: CreditEstimate['feature']): Promise<CreditsBalance>; addCredits(amount: number): Promise<CreditsBalance> }
export interface SubscriptionAdapter { getCurrentPlan(): Promise<PlanTier>; getAvailablePlans(): Promise<SubscriptionPlan[]>; requestUpgrade(plan: PlanTier): Promise<{ accepted: true; plan: PlanTier }> }
export interface EnterpriseAdapter { submitInquiry(inquiry: EnterpriseInquiry): Promise<{ captured: true }> }
export interface UserProfileAdapter { getProfile(): Promise<UserProfile>; updateProfile(update: Partial<Pick<UserProfile, 'displayName'>>): Promise<UserProfile> }

export interface PlatformAdapters { auth: AuthAdapter; credits: CreditsAdapter; subscription: SubscriptionAdapter; enterprise: EnterpriseAdapter; profile: UserProfileAdapter }
