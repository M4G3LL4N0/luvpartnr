import { useState } from 'react';

const SampleReportPage = () => {
  const [reportData, setReportData] = useState({
    executiveSummary: 'Strong market potential',
    scores: [95, 90, 85],
    redFlags: [],
    greenFlags: [1, 2],
    missingInfo: 'Need more data',
    nextSteps: 'Finalize analysis and present findings',
  });

  return (
    <div className="dark-theme">
      <h1>Sample Report</h1>
      <div className="report-content">
        <h2>Executive Summary</h2>
        <p>Strong market potential with clear opportunities.</p>
        <p>Scores: 95, 90, 85</p>
        <p>Red flags: None</p>
        <p>Green flags: 2</p>
        <p>Missing info: Need more data</p>
        <p>Next steps: Finalize analysis and present findings</p>
      </div>
    </div>
  );
};

export default SampleReportPage;
