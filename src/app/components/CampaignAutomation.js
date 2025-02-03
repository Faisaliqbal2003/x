'use client';
import React, { useState } from 'react';

export default function CampaignAutomation() {
  const [campaigns] = useState([
    {
      id: 1,
      name: 'Welcome Series',
      status: 'Active',
      type: 'Automated',
      triggers: ['New Follower'],
      performance: { sent: 1234, opened: 78, converted: 23 }
    },
    {
      id: 2,
      name: 'Lead Nurturing',
      status: 'Draft',
      type: 'Manual',
      triggers: ['Profile Visit'],
      performance: { sent: 567, opened: 82, converted: 31 }
    }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [step, setStep] = useState(1); // 1: Select Type, 2: Configure Campaign

  const automationTypes = [
    {
      id: 'cold-dm',
      name: 'Cold DM 2.0',
      description: 'Send outreach messages to users you imported to a lead source. Only sends messages to users who you have not yet messaged.',
      icon: '🎯'
    },
    {
      id: 'tweet-interaction',
      name: 'Auto DM - Tweet interactions',
      description: 'Automatically send messages to users who interact with one of your Tweets. You can set up multiple Auto DMs for different Tweets.',
      icon: '💬'
    },
    {
      id: 'new-follower',
      name: 'Auto DM - New follower',
      description: 'Automatically send messages to a new follower.',
      icon: '👥'
    }
  ];

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) setSelectedType(null);
    }
  };

  const ConfigureAutomation = () => {
    const [campaignName, setCampaignName] = useState('');
    const [message, setMessage] = useState('');
    const [followUpDelay, setFollowUpDelay] = useState('24');

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-gray-400 mb-6">
          <button onClick={handleBack} className="hover:text-white">
            ← Back
          </button>
          <span>/ Configure {selectedType?.name}</span>
        </div>

        {/* Basic Settings */}
        <div>
          <h4 className="font-semibold mb-4">Campaign Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Campaign Name</label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full bg-gray-800/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter campaign name"
              />
            </div>

            {selectedType?.id === 'cold-dm' && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Import Leads</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl mb-2">📄</span>
                    <p className="text-gray-400 mb-2">Drag and drop your CSV file here</p>
                    <p className="text-sm text-gray-500">or</p>
                    <button className="mt-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedType?.id === 'tweet-interaction' && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tweet URL</label>
                <input
                  type="text"
                  className="w-full bg-gray-800/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://twitter.com/..."
                />
              </div>
            )}
          </div>
        </div>

        {/* Message Configuration */}
        <div>
          <h4 className="font-semibold mb-4">Message Template</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Initial Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-800/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Enter your message template..."
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <button className="px-2 py-1 bg-gray-800 rounded text-sm hover:bg-gray-700">
                  {`{{name}}`}
                </button>
                <button className="px-2 py-1 bg-gray-800 rounded text-sm hover:bg-gray-700">
                  {`{{username}}`}
                </button>
                <button className="px-2 py-1 bg-gray-800 rounded text-sm hover:bg-gray-700">
                  {`{{custom}}`}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Follow-up Delay (hours)</label>
              <input
                type="number"
                value={followUpDelay}
                onChange={(e) => setFollowUpDelay(e.target.value)}
                className="w-32 bg-gray-800/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors">
            Create Campaign
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Campaign Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Campaign Automation</h2>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          Create Campaign
        </button>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              if (step === 1) setShowCreateModal(false);
              else handleBack();
            }}
          />
          
          <div className="relative z-50 h-full flex items-center justify-center p-4">
            <div className="bg-gray-900/90 rounded-xl p-6 border border-gray-800 max-w-2xl w-full">
              {step === 1 ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Automation Type</h3>
                    <button 
                      onClick={() => setShowCreateModal(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    {automationTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => handleTypeSelect(type)}
                        className="bg-gray-800/50 hover:bg-gray-800 rounded-xl p-4 cursor-pointer transition-colors border border-gray-700 hover:border-blue-500 group"
                      >
                        <div className="flex items-start gap-4">
                          <span className="text-2xl">{type.icon}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg group-hover:text-blue-400 transition-colors">
                              {type.name}
                            </h4>
                            <p className="text-gray-400 text-sm mt-1">
                              {type.description}
                            </p>
                          </div>
                          <span className="text-gray-600 group-hover:text-blue-500">
                            →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <ConfigureAutomation />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Campaign List */}
      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{campaign.name}</h3>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    campaign.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {campaign.status}
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {campaign.type}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  ⚙️
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  📊
                </button>
              </div>
            </div>

            {/* Triggers */}
            <div className="mb-4">
              <h4 className="text-sm text-gray-400 mb-2">Triggers</h4>
              <div className="flex gap-2">
                {campaign.triggers.map((trigger) => (
                  <span key={trigger} className="px-2 py-1 bg-gray-800 rounded-full text-sm">
                    {trigger}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Messages Sent</p>
                <p className="text-xl font-bold">{campaign.performance.sent}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Open Rate</p>
                <p className="text-xl font-bold">{campaign.performance.opened}%</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <p className="text-xl font-bold">{campaign.performance.converted}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 