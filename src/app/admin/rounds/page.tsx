'use client';
import AdminSidebar from '@/components/AdminSidebar';
import { useState, useEffect } from 'react';

export default function RoundControlPage() {
  const [roundStatus, setRoundStatus] = useState('Not Started');

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      alert('You are not authorized to view this page.');
      window.location.href = '/login';
    }
  }, []);

  // Stub functions to replace with your API calls
  const startRound = () => {
    console.log('Starting round...');
    setRoundStatus('Running');
  };

  const endRound = () => {
    console.log('Ending round...');
    setRoundStatus('Ended');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
     <AdminSidebar/>

      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">Round Control</h1>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto">
          <p className="text-xl mb-6">
            Current Round Status: <span className="font-semibold">{roundStatus}</span>
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={startRound}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
              aria-label="Start Round"
            >
              ▶️ Start Round
            </button>

            <button
              onClick={endRound}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
              aria-label="End Round"
            >
              ⏹️ End Round
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
