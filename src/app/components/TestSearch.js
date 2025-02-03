'use client';
import { useState } from 'react';
import { searchTwitterUsers } from '../lib/twitter';

export default function TestSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const users = await searchTwitterUsers({
        bioKeywords: "developer"
      });
      setResults(users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Test Search'}
      </button>

      {error && (
        <div className="text-red-500 mt-4">
          Error: {error}
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-bold">Results ({results.length})</h2>
        <div className="grid gap-4 mt-2">
          {results.map(user => (
            <div key={user.id} className="border p-4 rounded">
              <div className="font-bold">{user.name}</div>
              <div className="text-gray-600">@{user.username}</div>
              <div className="mt-2">{user.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 