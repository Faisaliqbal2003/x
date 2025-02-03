import React from 'react';
import Navigation from './components/Navigation';

export const metadata = {
  title: 'X Automation | DM Marketing Tool',
  description: 'Automate your X (Twitter) DMs for better engagement and marketing',
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-900 to-black relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-200">
                Automate Your X Marketing with Smart DMs
              </h1>
              <p className="text-xl text-gray-300">
                Reach more customers, engage better, and grow your audience with our intelligent X (Twitter) DM automation platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Get Started Free
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors border border-gray-700">
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700"/>
                  ))}
                </div>
                <p>Join 10,000+ marketers already using our platform</p>
              </div>
            </div>

            {/* Hero Image/Animation */}
            <div className="relative">
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-800">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b border-gray-800 pb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Smart DM Automation</h3>
                      <p className="text-sm text-gray-400">Intelligent responses & scheduling</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-300">🚀 Automated welcome messages</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-300">📊 Analytics & engagement tracking</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <p className="text-sm text-gray-300">🎯 Targeted audience segmentation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <main className="flex-grow p-4 md:p-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            {/* Feature cards with updated dark theme */}
            <div className="bg-gray-900/50 rounded-xl shadow-xl p-6 border border-gray-800 backdrop-blur-lg">
              <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Automation</h3>
              <p className="text-gray-400">
                Set up intelligent DM flows that respond to user interactions automatically.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-xl shadow-xl p-6 border border-gray-800 backdrop-blur-lg">
              <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Analytics Dashboard</h3>
              <p className="text-gray-400">
                Track engagement metrics and optimize your DM campaigns in real-time.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-xl shadow-xl p-6 border border-gray-800 backdrop-blur-lg">
              <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Audience Targeting</h3>
              <p className="text-gray-400">
                Segment your audience and personalize messages for better engagement.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
