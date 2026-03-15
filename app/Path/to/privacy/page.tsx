import { useState } from 'react';

const PrivacyPage = () => {
  const [data, setData] = useState({
    ethicalUse: true,
    privateDataHandling: 'Secure storage',
    surveillance: 'Not applicable',
    outputType: 'Structured interpretation',
  });

  return (
    <div className="dark-theme">
      <h1>Privacy Page</h1>
      <div className="privacy-info">
        <h2>Ethical Use</h2>
        <p>Data is handled ethically and securely.</p>
        <p>Private data is stored securely.</p>
        <p>Outputs are structured interpretations, not certainty claims.</p>
      </div>
    </div>
  );
};

export default PrivacyPage;
