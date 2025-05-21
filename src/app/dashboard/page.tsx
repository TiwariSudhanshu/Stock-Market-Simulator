"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Briefcase, 
  TrendingUp, 
  Leaf, 
  BarChart2, 
  DollarSign, 
  PieChart, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronDown
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// Mock data - replace with actual API calls in production
const mockPortfolioData = {
  totalValue: 12450.75,
  initialInvestment: 10000,
  profit: 2450.75,
  profitPercentage: 24.51,
  avgEsgScore: 8.4,
  diversificationScore: 7.8,
  overallScore: 8.1,
  sectorDistribution: [
    { name: 'Clean Energy', percentage: 35 },
    { name: 'Sustainable Tech', percentage: 25 },
    { name: 'Green Transport', percentage: 20 },
    { name: 'Recycling', percentage: 15 },
    { name: 'Eco-Agriculture', percentage: 5 },
  ],
  holdings: [
    { id: 1, company: 'SolarPeak Energy', sector: 'Clean Energy', shares: 15, avgBuyPrice: 68.50, currentPrice: 82.75, totalValue: 1241.25, esgScore: 9.2, dayChange: 3.2 },
    { id: 2, company: 'WindForce Global', sector: 'Clean Energy', shares: 22, avgBuyPrice: 45.30, currentPrice: 51.20, totalValue: 1126.40, esgScore: 8.9, dayChange: -1.2 },
    { id: 3, company: 'EcoMobility', sector: 'Green Transport', shares: 30, avgBuyPrice: 78.20, currentPrice: 92.50, totalValue: 2775.00, esgScore: 8.5, dayChange: 2.8 },
    { id: 4, company: 'RecycleNow', sector: 'Recycling', shares: 45, avgBuyPrice: 34.10, currentPrice: 38.25, totalValue: 1721.25, esgScore: 9.1, dayChange: 1.5 },
    { id: 5, company: 'GreenChip Tech', sector: 'Sustainable Tech', shares: 18, avgBuyPrice: 110.75, currentPrice: 125.20, totalValue: 2253.60, esgScore: 7.8, dayChange: 4.3 },
    { id: 6, company: 'AutoDrive Electric', sector: 'Green Transport', shares: 12, avgBuyPrice: 92.00, currentPrice: 86.50, totalValue: 1038.00, esgScore: 8.1, dayChange: -2.3 },
    { id: 7, company: 'CircuitEco', sector: 'Sustainable Tech', shares: 25, avgBuyPrice: 56.25, currentPrice: 64.30, totalValue: 1607.50, esgScore: 7.5, dayChange: 1.8 },
    { id: 8, company: 'FarmFresh Organics', sector: 'Eco-Agriculture', shares: 20, avgBuyPrice: 28.75, currentPrice: 34.40, totalValue: 688.00, esgScore: 9.3, dayChange: 5.6 },
  ],

  roundInfo: {
    current: 3,
    total: 5,
    timeRemaining: '01:23:45'
  }
};

export default function Dashboard() {
  const [portfolioData, setPortfolioData] = useState(mockPortfolioData);
  const [activeTab, setActiveTab] = useState('holdings');
  const [sortConfig, setSortConfig] = useState({ key: 'totalValue', direction: 'desc' });

  // In a real application, fetch actual data here
  useEffect(() => {
    // Example API call:
    // const fetchPortfolioData = async () => {
    //   try {
    //     const response = await fetch('/api/portfolio');
    //     const data = await response.json();
    //     setPortfolioData(data);
    //   } catch (error) {
    //     console.error('Error fetching portfolio data:', error);
    //   }
    // };
    //
    // fetchPortfolioData();
    
    // For now, we're using mock data
    setPortfolioData(mockPortfolioData);
  }, []);

 const sortedHoldings = [...portfolioData.holdings].sort((a: any, b: any) => {
  if (a[sortConfig.key] < b[sortConfig.key]) {
    return sortConfig.direction === 'asc' ? -1 : 1;
  }
  if (a[sortConfig.key] > b[sortConfig.key]) {
    return sortConfig.direction === 'asc' ? 1 : -1;
  }
  return 0;
});

const handleSort = (key: any) => {
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }
  setSortConfig({ key, direction });
};

const formatCurrency = (value: any) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

  return (
    <>
       <div className="flex">
        <div className="fixed left-0">
         <Sidebar/>

        </div>
    <div className="min-h-screen bg-gray-50 flex-grow sm:ml-64 ">
      <Head>
        <title>Portfolio Dashboard | Stock Market Simulator</title>
        <meta name="description" content="View your portfolio performance in the green stock market simulation" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="text-green-600 mr-2" size={24} />
              <h1 className="text-2xl font-bold text-gray-800">Stock Market Simulator</h1>
            </div>
            
            <div className="flex items-center bg-green-100 rounded-lg px-4 py-2">
              <Clock className="text-green-700 mr-2" size={18} />
              <div>
                <div className="text-sm text-green-800 font-medium">Round {portfolioData.roundInfo.current} of {portfolioData.roundInfo.total}</div>
                <div className="text-xs text-green-700">Time remaining: {portfolioData.roundInfo.timeRemaining}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Performance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Portfolio Value Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Briefcase className="text-blue-600" size={20} />
                </div>
                <h3 className="text-sm font-medium text-gray-500">Portfolio Value</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full flex items-center ${portfolioData.profit >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {portfolioData.profit >= 0 ? 
                  <ArrowUpRight size={12} className="mr-1" /> : 
                  <ArrowDownRight size={12} className="mr-1" />
                }
                {portfolioData.profitPercentage.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolioData.totalValue)}</p>
              <p className="ml-2 text-sm text-gray-500">from {formatCurrency(portfolioData.initialInvestment)}</p>
            </div>
          </div>

          {/* ESG Score Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <Leaf className="text-green-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Average ESG Score</h3>
            </div>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">{portfolioData.avgEsgScore.toFixed(1)}</p>
              <p className="ml-2 text-sm text-gray-500">/ 10</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${(portfolioData.avgEsgScore / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Diversification Score Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 rounded-full p-2 mr-3">
                <PieChart className="text-purple-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Sector Diversity</h3>
            </div>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">{portfolioData.diversificationScore.toFixed(1)}</p>
              <p className="ml-2 text-sm text-gray-500">/ 10</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${(portfolioData.diversificationScore / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Overall Score Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 rounded-full p-2 mr-3">
                <BarChart2 className="text-yellow-600" size={20} />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Overall Score</h3>
            </div>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">{portfolioData.overallScore.toFixed(1)}</p>
              <p className="ml-2 text-sm text-gray-500">/ 10</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${(portfolioData.overallScore / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sector Distribution */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-medium text-gray-800">Sector Distribution</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {portfolioData.sectorDistribution.map((sector, index) => (
                <div key={index} className="flex-grow min-w-[150px]">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{sector.name}</span>
                    <span className="text-sm text-gray-600">{sector.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index % 5 === 0 ? 'bg-green-500' : 
                        index % 5 === 1 ? 'bg-blue-500' : 
                        index % 5 === 2 ? 'bg-purple-500' : 
                        index % 5 === 3 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`} 
                      style={{ width: `${sector.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Content */}
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'holdings' 
                    ? 'border-green-500 text-green-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('holdings')}
              >
                <div className="flex items-center">
                  <Briefcase size={16} className="mr-2" />
                  Holdings
                </div>
              </button>
             
            </nav>
          </div>

          {/* Holdings Table */}
          {activeTab === 'holdings' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('company')}
                    >
                      <div className="flex items-center">
                        Company
                        {sortConfig.key === 'company' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('sector')}
                    >
                      <div className="flex items-center">
                        Sector
                        {sortConfig.key === 'sector' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('shares')}
                    >
                      <div className="flex items-center">
                        Shares
                        {sortConfig.key === 'shares' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('avgBuyPrice')}
                    >
                      <div className="flex items-center">
                        Avg. Buy
                        {sortConfig.key === 'avgBuyPrice' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('currentPrice')}
                    >
                      <div className="flex items-center">
                        Current
                        {sortConfig.key === 'currentPrice' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('dayChange')}
                    >
                      <div className="flex items-center">
                        Day %
                        {sortConfig.key === 'dayChange' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('totalValue')}
                    >
                      <div className="flex items-center">
                        Value
                        {sortConfig.key === 'totalValue' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('esgScore')}
                    >
                      <div className="flex items-center">
                        ESG
                        {sortConfig.key === 'esgScore' && (
                          <ChevronDown 
                            size={14} 
                            className={`ml-1 ${sortConfig.direction === 'desc' ? 'transform rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedHoldings.map((holding) => (
                    <tr key={holding.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {holding.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {holding.sector}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {holding.shares}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(holding.avgBuyPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(holding.currentPrice)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                        holding.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <div className="flex items-center">
                          {holding.dayChange >= 0 ? 
                            <ArrowUpRight size={14} className="mr-1" /> : 
                            <ArrowDownRight size={14} className="mr-1" />
                          }
                          {Math.abs(holding.dayChange)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(holding.totalValue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            holding.esgScore >= 9 ? 'bg-green-100 text-green-800' :
                            holding.esgScore >= 7 ? 'bg-green-50 text-green-600' :
                            holding.esgScore >= 5 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {holding.esgScore.toFixed(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Recent Trades */}
          {activeTab === 'trades' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shares
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>

              </table>
            </div>
          )}
        </div>
      </main>
    </div>
       </div>
    </>
  );
}