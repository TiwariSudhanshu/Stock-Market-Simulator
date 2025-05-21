"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { 
  Leaf, 
  Search, 
  ChevronDown, 
  Check, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';

// Mock data for companies
const companiesData = [
  {
    id: 1,
    name: "Green Energy Co",
    ticker: "GEC",
    esgScore: 9.2,
    sector: "Renewable Energy",
    description: "Leader in solar and wind energy solutions with sustainable manufacturing practices.",
    currentPrice: 78.45,
    dayChange: 1.5,
    marketCap: 12.4,
  },
  {
    id: 2,
    name: "Sustainable Tech",
    ticker: "STECH",
    esgScore: 8.7,
    sector: "Technology",
    description: "Develops energy-efficient electronics with circular economy focus.",
    currentPrice: 142.30,
    dayChange: -0.8,
    marketCap: 45.8,
  },
  {
    id: 3,
    name: "Clean Water Solutions",
    ticker: "CWS",
    esgScore: 9.5,
    sector: "Utilities",
    description: "Provides innovative water treatment and conservation technologies.",
    currentPrice: 65.20,
    dayChange: 2.1,
    marketCap: 8.9,
  },
  {
    id: 4,
    name: "Sustainable Agriculture",
    ticker: "SAGR",
    esgScore: 8.9,
    sector: "Agriculture",
    description: "Specializes in organic farming practices and sustainable food production.",
    currentPrice: 42.75,
    dayChange: 0.5,
    marketCap: 6.3,
  },
  {
    id: 5,
    name: "Eco Materials",
    ticker: "EMAT",
    esgScore: 9.1,
    sector: "Materials",
    description: "Produces biodegradable alternatives to plastics and sustainable building materials.",
    currentPrice: 53.60,
    dayChange: 1.2,
    marketCap: 7.1,
  },
  {
    id: 6,
    name: "Electric Transport",
    ticker: "ETRN",
    esgScore: 8.6,
    sector: "Transportation",
    description: "Develops electric vehicles and sustainable transportation solutions.",
    currentPrice: 208.90,
    dayChange: 3.2,
    marketCap: 87.4,
  },
  {
    id: 7,
    name: "Circular Economy Inc",
    ticker: "CEI",
    esgScore: 9.3,
    sector: "Consumer Goods",
    description: "Designs products with end-of-life recycling in mind and zero-waste manufacturing.",
    currentPrice: 36.25,
    dayChange: -1.1,
    marketCap: 4.8,
  },
  {
    id: 8,
    name: "Green Building Corp",
    ticker: "GBC",
    esgScore: 8.5,
    sector: "Construction",
    description: "Specializes in sustainable architecture and eco-friendly building practices.",
    currentPrice: 94.70,
    dayChange: 0.7,
    marketCap: 10.2,
  },
  {
    id: 9,
    name: "Ethical Finance",
    ticker: "EFIN",
    esgScore: 8.8,
    sector: "Financial Services",
    description: "Provides sustainable investment options and ethical banking services.",
    currentPrice: 112.35,
    dayChange: -0.3,
    marketCap: 22.6,
  },
  {
    id: 10,
    name: "Better Healthcare",
    ticker: "BHLT",
    esgScore: 8.3,
    sector: "Healthcare",
    description: "Delivers affordable healthcare with focus on reducing environmental footprint.",
    currentPrice: 87.15,
    dayChange: 1.8,
    marketCap: 15.7,
  },
  {
    id: 11,
    name: "Sustainable Textiles",
    ticker: "STEX",
    esgScore: 9.0,
    sector: "Textiles",
    description: "Produces eco-friendly fabrics and promotes ethical labor practices.",
    currentPrice: 44.50,
    dayChange: 0.9,
    marketCap: 5.3,
  },
  {
    id: 12,
    name: "Clean Energy Storage",
    ticker: "CEST",
    esgScore: 9.4,
    sector: "Energy",
    description: "Develops advanced battery technology for renewable energy storage.",
    currentPrice: 128.75,
    dayChange: 2.5,
    marketCap: 31.2,
  },
  {
    id: 13,
    name: "Organic Foods Co",
    ticker: "OFC",
    esgScore: 8.9,
    sector: "Food & Beverage",
    description: "Produces organic, locally-sourced food products with sustainable packaging.",
    currentPrice: 73.20,
    dayChange: -0.4,
    marketCap: 9.8,
  },
  {
    id: 14,
    name: "Smart Resource Management",
    ticker: "SRM",
    esgScore: 9.2,
    sector: "Waste Management",
    description: "Provides innovative waste reduction and recycling solutions.",
    currentPrice: 91.85,
    dayChange: 1.3,
    marketCap: 11.5,
  },
  {
    id: 15,
    name: "Eco Tourism",
    ticker: "ETRM",
    esgScore: 8.7,
    sector: "Tourism",
    description: "Offers sustainable travel experiences with minimal environmental impact.",
    currentPrice: 57.30,
    dayChange: 0.2,
    marketCap: 6.9,
  }
];

// Helper function to format currency
const formatCurrency = (value:any) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value);
};

// Helper function to format market cap in billions
const formatMarketCap = (value:any) => {
  return `$${value}B`;
};

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(companiesData);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [activeFilters, setActiveFilters] = useState({
    sector: '',
    esgScore: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;

  // All unique sectors for filtering
  const sectors = [...new Set(companiesData.map(company => company.sector))];
  
  // ESG score filter options
  const esgScoreOptions = [
    { label: 'All', value: '' },
    { label: '9+', value: '9+' },
    { label: '8+', value: '8+' },
    { label: '7+', value: '7+' },
    { label: 'Below 7', value: '<7' }
  ];

  // Handle sorting
  const handleSort = (key:any) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle search
  useEffect(() => {
    let results = companiesData;
    
    // Apply search
    if (searchTerm) {
      results = results.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sector filter
    if (activeFilters.sector) {
      results = results.filter(company => company.sector === activeFilters.sector);
    }
    
    // Apply ESG score filter
    if (activeFilters.esgScore) {
      switch(activeFilters.esgScore) {
        case '9+':
          results = results.filter(company => company.esgScore >= 9);
          break;
        case '8+':
          results = results.filter(company => company.esgScore >= 8);
          break;
        case '7+':
          results = results.filter(company => company.esgScore >= 7);
          break;
        case '<7':
          results = results.filter(company => company.esgScore < 7);
          break;
        default:
          break;
      }
    }
    
    // Sort results
 results = [...results].sort((a: any, b: any) => {
  if (a[sortConfig.key] < b[sortConfig.key]) {
    return sortConfig.direction === 'asc' ? -1 : 1;
  }
  if (a[sortConfig.key] > b[sortConfig.key]) {
    return sortConfig.direction === 'asc' ? 1 : -1;
  }
  return 0;
});

    
    setFilteredCompanies(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, sortConfig, activeFilters]);

  // Calculate pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setActiveFilters({
      sector: '',
      esgScore: '',
    });
  };

  return (
    <>
      <div className="flex">
        <div className="fixed left-0">
          <Sidebar />
        </div>
        <div className="min-h-screen bg-gray-50 flex-grow sm:ml-64">
          <Head>
            <title>Companies | Stock Market Simulator</title>
            <meta name="description" content="Browse all companies in the green stock market simulation" />
          </Head>

          {/* Header */}
          <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center">
                <Leaf className="text-green-600 mr-2" size={24} />
                <h1 className="text-2xl font-bold text-gray-800">Companies Directory</h1>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Search */}
                  <div className="relative flex-grow max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 text-black border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      placeholder="Search companies, tickers, sectors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setSearchTerm('')}
                      >
                        <XCircle size={18} className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-3">
                    {/* Sector Filter */}
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          id="sector-menu"
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          <Filter size={16} className="mr-2 text-gray-500" />
                          {activeFilters.sector || 'All Sectors'}
                          <ChevronDown size={16} className="ml-2 -mr-1" />
                        </button>
                      </div>
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="sector-menu">
                          <button
                            className="text-gray-700 block px-4 py-2 text-sm w-full text-left flex items-center"
                            onClick={() => setActiveFilters({...activeFilters, sector: ''})}
                          >
                            <span className="flex-grow">All Sectors</span>
                            {!activeFilters.sector && <Check size={16} className="text-green-600" />}
                          </button>
                          {sectors.map((sector) => (
                            <button
                              key={sector}
                              className="text-gray-700 block px-4 py-2 text-sm w-full text-left flex items-center"
                              onClick={() => setActiveFilters({...activeFilters, sector})}
                            >
                              <span className="flex-grow">{sector}</span>
                              {activeFilters.sector === sector && <Check size={16} className="text-green-600" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ESG Score Filter */}
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          id="esg-menu"
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          <Leaf size={16} className="mr-2 text-green-500" />
                          ESG: {activeFilters.esgScore || 'All Scores'}
                          <ChevronDown size={16} className="ml-2 -mr-1" />
                        </button>
                      </div>
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="esg-menu">
                          {esgScoreOptions.map((option) => (
                            <button
                              key={option.value}
                              className="text-gray-700 block px-4 py-2 text-sm w-full text-left flex items-center"
                              onClick={() => setActiveFilters({...activeFilters, esgScore: option.value})}
                            >
                              <span className="flex-grow">{option.label}</span>
                              {activeFilters.esgScore === option.value && <Check size={16} className="text-green-600" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {(activeFilters.sector || activeFilters.esgScore || searchTerm) && (
                      <button
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Companies Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          Company
                          {sortConfig.key === 'name' && (
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
                        onClick={() => handleSort('ticker')}
                      >
                        <div className="flex items-center">
                          Ticker
                          {sortConfig.key === 'ticker' && (
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
                        onClick={() => handleSort('esgScore')}
                      >
                        <div className="flex items-center">
                          ESG Score
                          {sortConfig.key === 'esgScore' && (
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
                          Price
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
                        onClick={() => handleSort('marketCap')}
                      >
                        <div className="flex items-center">
                          Market Cap
                          {sortConfig.key === 'marketCap' && (
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
                    {currentCompanies.map((company) => (
                      <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{company.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{company.ticker}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{company.sector}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              company.esgScore >= 9 ? 'bg-green-100 text-green-800' :
                              company.esgScore >= 7 ? 'bg-green-50 text-green-600' :
                              company.esgScore >= 5 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {company.esgScore.toFixed(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(company.currentPrice)}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          company.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <div className="flex items-center">
                            {company.dayChange >= 0 ? 
                              <ArrowUpRight size={14} className="mr-1" /> : 
                              <ArrowDownRight size={14} className="mr-1" />
                            }
                            {Math.abs(company.dayChange)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatMarketCap(company.marketCap)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Company Details */}
              <div className="border-t border-gray-200">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900">Company Descriptions</h3>
                  <div className="mt-4 space-y-6">
                    {currentCompanies.map((company) => (
                      <div key={`desc-${company.id}`} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-md font-medium text-gray-900">{company.name} ({company.ticker})</h4>
                            <p className="mt-1 text-sm text-gray-500">{company.description}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(company.currentPrice)}</div>
                            <div className={`text-sm flex items-center ${
                              company.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {company.dayChange >= 0 ? 
                                <ArrowUpRight size={14} className="mr-1" /> : 
                                <ArrowDownRight size={14} className="mr-1" />
                              }
                              {Math.abs(company.dayChange)}%
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-4">
                          <div className="text-sm text-gray-500">Sector: {company.sector}</div>
                          <div className="text-sm text-gray-500">Market Cap: {formatMarketCap(company.marketCap)}</div>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-1">ESG Score:</span>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              company.esgScore >= 9 ? 'bg-green-100 text-green-800' :
                              company.esgScore >= 7 ? 'bg-green-50 text-green-600' :
                              company.esgScore >= 5 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {company.esgScore.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pagination */}
              {/* {filteredCompanies.length > companiesPerPage && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
                          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
                          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{indexOfFirstCompany + 1}</span> to <span className="font-medium">
                            {Math.min(indexOfLastCompany, filteredCompanies.length)}</span> of <span className="font-medium">{filteredCompanies.length}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft size={18} />
                          </button>
                           */}
                          {/* Page numbers */}
                          {/* {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i + 1)}
                         */}
                        </div>
        </main>
        </div>
        </div>
        </>
  );

}
