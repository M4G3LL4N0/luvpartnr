's craft.
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-[#1a1a1a]">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            LUVPARTNR
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto">
            AI-powered relationship intelligence that helps couples build stronger, healthier connections through data-driven insights and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary">
              <span>Get Early Access</span>
            </button>
            <button className="btn-secondary">
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Transform Your Relationship with AI
          </h2>
          <p className="text-lg text-zinc-400 mb-16">
            We analyze communication patterns, emotional dynamics, and relationship health to provide actionable insights that strengthen your bond.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 6.75l6.75 6.75M12 6.75L5.25 13.5M12 17.25h.01M12 17.25v.01"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Communication Analysis</h3>
              <p className="text-zinc-400">
                Understand your communication patterns and identify areas for improvement.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 22s8-4 8-10.5S20 2 12 2 4 6 4 12.5 8 22 12 22z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Emotional Intelligence</h3>
              <p className="text-zinc-400">
                Gain insights into emotional dynamics and learn to navigate conflicts effectively.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-green-500 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Relationship Health Score</h3>
              <p className="text-zinc-400">
                Track your relationship's progress with our comprehensive health metrics.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-orange-500 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 22c5-4.974 9-10 9-10s-4-5.026-9-10-9 5.026-9 10 4 10 9 10z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Personalized Recommendations</h3>
              <p className="text-zinc-400">
                Get tailored advice and activities based on your unique relationship dynamics.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-pink-500 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 22s8-4 8-10.5S20 2 12 2 4 6 4 12.5 8 22 12 22z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Privacy-First Design</h3>
              <p className="text-zinc-400">
                Your data is encrypted and never shared without your explicit consent.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-red-500 rounded-lg mb-6 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M12 22c5-4.974 9-10 9-10s-4-5.026-9-10-9 5.026-9 10 4 10 9 10z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">24/7 AI Support</h3>
              <p className="text-zinc-400">
                Access relationship guidance anytime with our intelligent AI companion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Ethics Section */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Privacy & Ethics Matter
          </h2>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Your Data, Your Control
                </h3>
                <p className="text-zinc-400 mb-4">
                  We believe relationship growth should never come at the cost of privacy. All data is encrypted end-to-end and processed locally when possible.
                </p>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3"></span>
                    End-to-end encryption
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3"></span>
                    No third-party sharing
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3"></span>
                    Complete data portability
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Ethical AI Development
                </h3>
                <p className="text-zinc-400 mb-4">
                  Our AI is trained to promote healthy relationships, not manipulate emotions. We actively work to eliminate bias and ensure our recommendations are always in your best interest.
                </p>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3"></span>
                    Bias mitigation protocols
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3"></span>
                    Transparent algorithms
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 mr-3"></span>
                    Regular ethical audits
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Relationship?
          </h2>
          <p className="text-lg text-zinc-400 mb-12">
            Join our early access program and be among the first to experience AI-powered relationship growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary">
              <span>Join Waitlist</span>
            </button>
            <button className="btn-secondary">
              <span>Contact Sales</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
