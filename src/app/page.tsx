"use client";

import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { ArrowRight, LogIn, Leaf } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  
  const handleStartSimulation = () => {
    router.push('/simulation');
  };
  
  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Head>
        <title>Stock Market Simulator - Green Investing</title>
        <meta name="description" content="Interactive stock market simulator focused on green companies with ESG metrics" />
      </Head>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center">
        {/* Hero Section */}
        <div className="flex items-center mb-8">
          <Leaf className="text-green-600 mr-2" size={36} />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Stock Market <span className="text-green-600">Simulator</span>
          </h1>
        </div>
        
        <p className="text-xl text-gray-600 max-w-2xl text-center mb-8">
          Learn sustainable investing by trading virtual stocks of green companies
        </p>
        
        {/* Card with Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10 max-w-3xl w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <span className="font-bold text-green-700">1</span>
              </div>
              <p className="text-gray-700">
                <strong>Trade Green Stocks:</strong> Buy and sell shares from eco-friendly companies across various sectors.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <span className="font-bold text-green-700">2</span>
              </div>
              <p className="text-gray-700">
                <strong>Build Your Portfolio:</strong> Balance financial returns with environmental impact through ESG scores.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <span className="font-bold text-green-700">3</span>
              </div>
              <p className="text-gray-700">
                <strong>Diversify Sectors:</strong> Spread investments across different green industries for optimal scoring.
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-4">
                <span className="font-bold text-green-700">4</span>
              </div>
              <p className="text-gray-700">
                <strong>Compete:</strong> Ranked on a leaderboard based on portfolio value (40%), ESG score (40%), and sector diversity (20%).
              </p>
            </div>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded text-sm text-gray-700 mb-6">
            <p className="font-semibold mb-1">Note:</p>
            <p>This is a simulation organized in timed trading rounds. All participants start with the same virtual budget. No real money is involved.</p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={handleStartSimulation}
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg transition duration-200 font-medium text-lg shadow-md"
            >
              Start Simulation
              <ArrowRight className="ml-2" size={20} />
            </button>
            
            <button 
              onClick={handleLogin}
              className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 py-3 px-8 rounded-lg transition duration-200 font-medium text-lg"
            >
              Login
              <LogIn className="ml-2" size={20} />
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-gray-600 text-center mt-12">
          <p>© 2025 Stock Market Simulation Labsite. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}