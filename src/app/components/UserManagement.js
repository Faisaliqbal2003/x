'use client';
import React, { useState } from 'react';

export default function UserManagement() {
  const [users] = useState([
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active', lastActive: '2m ago' },
    { id: 2, name: 'Jane Smith', role: 'Manager', status: 'Active', lastActive: '5m ago' },
    { id: 3, name: 'Mike Johnson', role: 'User', status: 'Inactive', lastActive: '1h ago' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
          Add New User
        </button>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Last Active</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                        {user.name[0]}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{user.lastActive}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                        ✏️
                      </button>
                      <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 