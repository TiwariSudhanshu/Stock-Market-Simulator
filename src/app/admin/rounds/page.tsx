'use client';
import { useState } from 'react';

export default function RoundControlPage() {
  const [roundStatus, setRoundStatus] = useState('Not Started');

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
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Round Control</h1>
      <p className="mb-6">
        Current Round Status: <strong>{roundStatus}</strong>
      </p>
      <div className="flex gap-4">
        <button
          onClick={startRound}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Start Round
        </button>
        <button
          onClick={endRound}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          End Round
        </button>
      </div>
    </div>
  );
}
