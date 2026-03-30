export const fetchSaaSMetrics = async () => {
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
};
