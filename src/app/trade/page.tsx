// The Sidebar component is already created at @/components/sidebar
// We'll just import it as needed in our trade form

// app/trade/page.tsx
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function TradePage() {
  const [formData, setFormData] = useState({
    companyName: '',
    tradeType: 'buy',
    numberOfShares: 0,
    pricePerShare: 0,
    totalAmount: 0,
    esgScore: 50,
    agreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
      return;
    }

    // For number inputs, convert to number
    if (type === 'number') {
      const numValue = value === '' ? 0 : parseFloat(value);
      
      // Calculate total amount when shares or price changes
      if (name === 'numberOfShares' || name === 'pricePerShare') {
        const shares = name === 'numberOfShares' ? numValue : formData.numberOfShares;
        const price = name === 'pricePerShare' ? numValue : formData.pricePerShare;
        
        setFormData({
          ...formData,
          [name]: numValue,
          totalAmount: shares * price
        });
      } else {
        setFormData({
          ...formData,
          [name]: numValue
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreement) {
      setSubmitMessage('Please agree to the terms first');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await fetch('/api/trade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitMessage('Trade submitted successfully!');
        // Reset form
        setFormData({
          companyName: '',
          tradeType: 'buy',
          numberOfShares: 0,
          pricePerShare: 0,
          totalAmount: 0,
          esgScore: 50,
          agreement: false
        });
      } else {
        setSubmitMessage(`Error: ${data.message || 'Failed to submit trade'}`);
      }
    } catch (error) {
      setSubmitMessage('Network error. Please try again.');
      console.error('Failed to submit trade:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      <Sidebar />
      
      <div className="ml-64 flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">New Trade</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Trade Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tradeType"
                    value="buy"
                    checked={formData.tradeType === 'buy'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Buy
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tradeType"
                    value="sell"
                    checked={formData.tradeType === 'sell'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Sell
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="numberOfShares">
                Number of Shares
              </label>
              <input
                type="number"
                id="numberOfShares"
                name="numberOfShares"
                value={formData.numberOfShares || ''}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="pricePerShare">
                Price per Share ($)
              </label>
              <input
                type="number"
                id="pricePerShare"
                name="pricePerShare"
                value={formData.pricePerShare || ''}
                onChange={handleInputChange}
                step="0.01"
                min="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="totalAmount">
                Total Amount ($)
              </label>
              <input
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={formData.totalAmount}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="esgScore">
                ESG Score: {formData.esgScore}
              </label>
              <input
                type="range"
                id="esgScore"
                name="esgScore"
                min="0"
                max="100"
                value={formData.esgScore}
                onChange={handleInputChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 - Poor</span>
                <span>50 - Average</span>
                <span>100 - Excellent</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <span className="text-gray-700">
                  I agree to the terms and conditions and confirm this trade.
                </span>
              </label>
            </div>
            
            {submitMessage && (
              <div className={`mb-4 p-3 rounded ${submitMessage.includes('Error') || submitMessage.includes('Please agree') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {submitMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : `${formData.tradeType === 'buy' ? 'Buy' : 'Sell'} Shares`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Let's create the API endpoint for processing trades
// app/api/trade/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.companyName) {
      return NextResponse.json({ message: 'Company name is required' }, { status: 400 });
    }
    
    if (data.numberOfShares <= 0) {
      return NextResponse.json({ message: 'Number of shares must be positive' }, { status: 400 });
    }
    
    if (data.pricePerShare <= 0) {
      return NextResponse.json({ message: 'Price per share must be positive' }, { status: 400 });
    }
    
    if (!data.agreement) {
      return NextResponse.json({ message: 'You must agree to the terms' }, { status: 400 });
    }
    
    // In a real app, we would process the trade here
    // For example, connect to a database, payment processor, etc.
    
    // For now, we'll just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success response
    return NextResponse.json({ 
      message: 'Trade processed successfully',
      tradeId: `T-${Date.now()}`,
      tradeDetails: {
        ...data,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error processing trade:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}