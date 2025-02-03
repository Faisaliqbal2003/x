'use client';
import React, { useState } from 'react';
import { searchTwitterUsers } from '../lib/twitter';

export default function LeadFinder() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async () => {
    if (!searchKeywords) return;
    
    setIsLoading(true);
    setSearchError(null);
    
    try {
      const users = await searchTwitterUsers({
        bioKeywords: searchKeywords
      });
      setSearchResults(users);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold mb-4">Find Twitter Leads</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Search Keywords (Bio)
            </label>
            <input
              type="text"
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
              placeholder="e.g., founder, entrepreneur, developer"
              className="w-full bg-gray-800/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={isLoading || !searchKeywords}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isLoading ? 'Searching...' : 'Search Leads'}
          </button>
        </div>

        {searchError && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
            {searchError}
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Results ({searchResults.length})
            </h3>
            <div className="space-y-4">
              {searchResults.map(user => (
                <div key={user.id} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    {user.profile_image_url && (
                      <img 
                        src={user.profile_image_url} 
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-gray-400">@{user.username}</div>
                      {user.description && (
                        <div className="text-sm text-gray-300 mt-2">
                          {user.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 