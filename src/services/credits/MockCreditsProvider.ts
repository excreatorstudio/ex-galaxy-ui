import { creditsConfig } from '../../features/credits/creditsConfig'
import type { CreditEstimate, CreditsAdapter, CreditsBalance, CreditsTransaction } from '../platform/types'

export class MockCreditsProvider implements CreditsAdapter {
  private balance: number = creditsConfig.plans.creator.displayBalance
  private history: CreditsTransaction[] = [
    { id: 'allocation-july', label: 'Monthly Creator allocation', delta: 1500, at: '2026-07-01', kind: 'allocation' },
    { id: 'video-concept', label: 'Video Studio concept workflow', delta: -45, at: '2026-07-24', kind: 'workflow' },
    { id: 'voice-concept', label: 'E.X Voice Studio preview', delta: -12, at: '2026-07-25', kind: 'workflow' },
  ]

  async getBalance(): Promise<CreditsBalance> { return { balance: this.balance, monthlyAllocation: creditsConfig.plans.creator.monthlyAllocation, usageThisMonth: 1020, currency: creditsConfig.currencyName } }
  async getHistory() { return [...this.history] }
  async estimate(feature: CreditEstimate['feature']) { return { feature, cost: creditsConfig.costs[feature] } }
  async consume(feature: CreditEstimate['feature']) { const estimate = await this.estimate(feature); this.balance = Math.max(0, this.balance - estimate.cost); return this.getBalance() }
  async addCredits(amount: number) { this.balance += amount; return this.getBalance() }
}
