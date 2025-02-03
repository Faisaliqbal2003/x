'use client';
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import LeadFinder from '../components/LeadFinder';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('leads');

  const tabs = [
    { id: 'leads', name: 'Lead Finder', icon: '🎯' },
    { id: 'messages', name: 'Messages', icon: '💬' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 border border-gray-800">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-400">@johndoe</p>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'leads' && <LeadFinder />}
            
            {activeTab === 'messages' && (
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">Messages</h2>
                {/* Add messages content */}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">Analytics</h2>
                {/* Add analytics content */}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">Settings</h2>
                {/* Add settings content */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 