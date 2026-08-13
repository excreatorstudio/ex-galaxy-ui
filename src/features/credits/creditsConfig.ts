export const creditsConfig = {
  currencyName: 'E.X Credits',
  plans: {
    free: { monthlyAllocation: 100, displayBalance: 100 },
    creator: { monthlyAllocation: 1500, displayBalance: 480 },
    enterprise: { monthlyAllocation: null, displayBalance: null },
  },
  costs: { image: 8, video: 45, voice: 12, render: 25 },
} as const
