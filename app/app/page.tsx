// @app
// @server
// @jsx
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-purple-400">LUVPARTNR</h1>
          <p className="text-sm text-gray-400 mt-1">Relationship Intelligence Platform</p>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg bg-purple-900 text-purple-200">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 text-gray-300">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Cases
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 text-gray-300">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profiles
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 text-gray-300">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-gray-700 text-gray-300">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-6 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="font-semibold">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Premium User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Relationship Dashboard</h1>
              <p className="text-gray-400 mt-1">Comprehensive analysis of your relationship dynamics</p>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Analysis
            </button>
          </div>
        </div>

        {/* Score Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ScoreCard title="Trustworthiness" value="87" change="+5%" description="High level of trust established" />
          <ScoreCard title="Emotional Maturity" value="92" change="+3%" description="Strong emotional regulation" />
          <ScoreCard title="Consistency" value="78" change="-2%" description="Minor fluctuations in behavior" />
          <ScoreCard title="Compatibility" value="85" change="+7%" description="Strong alignment of values" />
        </div>

        {/* Case File and Timeline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Current Case File */}
          <div className="lg:col-span-2">
            <CaseFileCard />
          </div>
          
          {/* Recent Timeline */}
          <div>
            <TimelineSection />
          </div>
        </div>

        {/* Warning Signals and Missing Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WarningSignalsSection />
          <MissingInfoSection />
        </div>
      </main>
    </div>
  );
}

// Score Card Component
function ScoreCard({ title, value, change, description }: { title: string; value: string; change: string; description: string }) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-bold">{value}</span>
            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${isPositive ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
              {change}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">{description}</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Case File Card Component
function CaseFileCard() {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Current Case File</h2>
        <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm font-medium">Active</span>
      </div>
      
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
          AS
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold">Alexandra Smith</h3>
          <p className="text-gray-400">Case ID: #RP-2023-0842</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Relationship Duration</span>
          <span className="font-medium">8 months</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Last Interaction</span>
          <span className="font-medium">2 days ago</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Risk Level</span>
          <span className="px-2 py-1 bg-yellow-900 text-yellow-300 rounded text-sm font-medium">Medium</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <h4 className="font-medium mb-2">Key Insights</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Communication patterns show 23% increase in positive engagement</li>
          <li>• Conflict resolution effectiveness improved by 15%</li>
          <li>• Emotional attunement score remains high (91/100)</li>
        </ul>
      </div>
    </div>
  );
}

// Timeline Section Component
function TimelineSection() {
  const events = [
    { time: '2d ago', title: 'Weekly Check-in', description: 'Completed relationship assessment', type: 'positive' },
    { time: '5d ago', title: 'Conflict Resolution', description: 'Successfully resolved disagreement', type: 'positive' },
    { time: '1w ago', title: 'Communication Gap', description: 'Noticed decreased responsiveness', type: 'warning' },
    { time: '2w ago', title: 'Quality Time', description: 'Spent weekend together', type: 'positive' },
  ];
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold mb-6">Recent Timeline</h2>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex">
            <div className={`flex flex-col items-center mr-4 ${index < events.length - 1 ? 'h-full' : ''}`}>
              <div className={`w-3 h-3 rounded-full ${event.type === 'positive' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              {index < events.length - 1 && <div className="w-0.5 h-full bg-gray-700 mt-2"></div>}
            </div>
            <div className="pb-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{event.title}</span>
                <span className="text-xs text-gray-400">{event.time}</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 text-center text-purple-400 hover:text-purple-300 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
        View Full Timeline
      </button>
    </div>
  );
}

// Warning Signals Section Component
function WarningSignalsSection() {
  const signals = [
    { title: 'Communication Decline', description: 'Response time increased by 40%', severity: 'high' },
    { title: 'Emotional Distance', description: 'Affectionate gestures decreased', severity: 'medium' },
    { title: 'Future Plans', description: 'Avoids discussing long-term commitments', severity: 'medium' },
  ];
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold mb-6">Key Warning Signals</h2>
      
      <div className="space-y-4">
        {signals.map((signal, index) => (
          <div key={index} className="p-4 rounded-lg bg-gray-750 border border-gray-700">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{signal.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                signal.severity === 'high' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'
              }`}>
                {signal.severity === 'high' ? 'High' : 'Medium'}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2">{signal.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <h4 className="font-medium mb-2">Recommendations</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Schedule open conversation about communication patterns</li>
          <li>• Plan intentional quality time together</li>
          <li>• Discuss future aspirations and expectations</li>
        </ul>
      </div>
    </div>
  );
}

// Missing Info Section Component
function MissingInfoSection() {
  const missingItems = [
    { title: 'Financial Compatibility', status: 'Not Assessed', priority: 'high' },
    { title: 'Family Background', status: 'Incomplete', priority: 'medium' },
    { title: 'Long-Term Goals', status: 'Partially Discussed', priority: 'high' },
    { title: 'Past Relationship History', status: 'Limited Information', priority: 'medium' },
  ];
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-bold mb-6">Missing Information</h2>
      
      <div className="space-y-4">
        {missingItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gray-750">
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.status}</p>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              item.priority === 'high' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'
            }`}>
              {item.priority === 'high' ? 'Critical' : 'Important'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
          Request Information
        </button>
      </div>
    </div>
  );
}
