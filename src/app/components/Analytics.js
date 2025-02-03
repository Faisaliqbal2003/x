'use client';
import React from 'react';

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
          <h3 className="text-gray-400 text-sm">Total Followers</h3>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-2xl font-bold">24,521</span>
            <span className="text-green-500 text-sm">+12.5%</span>
          </div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
          <h3 className="text-gray-400 text-sm">Engagement Rate</h3>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-2xl font-bold">5.2%</span>
            <span className="text-green-500 text-sm">+2.1%</span>
          </div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
          <h3 className="text-gray-400 text-sm">Active Campaigns</h3>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-2xl font-bold">8</span>
            <span className="text-blue-500 text-sm">Running</span>
          </div>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
          <h3 className="text-gray-400 text-sm">Conversion Rate</h3>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-2xl font-bold">12.3%</span>
            <span className="text-green-500 text-sm">+1.8%</span>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            {['Welcome Flow', 'Lead Generation', 'Product Launch'].map((campaign) => (
              <div key={campaign} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <h4 className="font-medium">{campaign}</h4>
                  <p className="text-sm text-gray-400">Last 7 days</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">2,145</p>
                  <p className="text-sm text-green-500">+15.3%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-4">Engagement Metrics</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Response Rate</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div className="h-full w-[78%] bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Click Through Rate</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div className="h-full w-[45%] bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Conversion Rate</span>
                <span className="font-medium">23%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div className="h-full w-[23%] bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 