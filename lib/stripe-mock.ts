export interface SaaSMetrics {
  mrr: number;
  mrrGrowth: number;
  churn: number;
  ltv: number;
  activeCustomers: number;
  chartData: Array<{
    month: string;
    revenue: number;
    users: number;
  }>;
}

export interface ApiError {
  message: string;
  status?: number;
}

export const fetchSaaSMetrics = async (): Promise<SaaSMetrics> => {
  try {
    // Simulated API response from Stripe
    return {
      mrr: 12450.00,
      mrrGrowth: 12.5,
      churn: 2.1,
      ltv: 850,
      activeCustomers: 420,
      chartData: [
        { month: "Jan", revenue: 8200, users: 310 },
        { month: "Feb", revenue: 9400, users: 345 },
        { month: "Mar", revenue: 10100, users: 370 },
        { month: "Apr", revenue: 11200, users: 395 },
        { month: "May", revenue: 12450, users: 420 },
      ]
    };
  } catch (error) {
    console.error('Failed to fetch SaaS metrics:', error);
    throw {
      message: 'Failed to load SaaS metrics. Please try again.',
      status: 500
    } as ApiError;
  }
};
