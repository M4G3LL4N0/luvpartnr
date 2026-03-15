import { useState } from 'react';

const PricingPage = () => {
  const [tiers, setTiers] = useState([
    { name: 'Free', price: 0 },
    { name: 'Pro', price: 29 },
    { name: 'Premium', price: 49 },
  ]);

  return (
    <div className="dark-theme">
      <h1>Pricing Page</h1>
      <div className="pricing-tiers">
        {tiers.map(tier => (
          <div key={tier.name} className="tier-card">
            <h3>{tier.name}</h3>
            <p>Price: ${tier.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
