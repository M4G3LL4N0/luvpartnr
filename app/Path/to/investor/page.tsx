import { useState } from 'react';

const InvestorPage = () => {
  const [marketData, setMarketData] = useState({
    opportunity: 'High',
    categoryCreation: 'Yes',
    moat: 'Strong',
    revenueModel: 'Subscription',
    expansionPlan: 'Yes',
  });

  return (
    <div className="dark-theme">
      <h1>Investor Page</h1>
      <div className="market-summary">
        <h2>Market Opportunity</h2>
        <p>High</p>
        <p>Category creation: Yes</p>
        <p>Moat: Strong</p>
        <p>Revenue model: Subscription</p>
        <p>Expansion plan: Yes</p>
      </div>
    </div>
  );
};

export default InvestorPage;
