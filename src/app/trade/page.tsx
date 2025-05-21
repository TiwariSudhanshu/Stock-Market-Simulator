'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function TradePage() {
  const [formData, setFormData] = useState({
    companyName: '',
    action: 'buy',
    noOfShares: 0,
    pricePerShare: 0,
    totalAmount: 0,
    esgValue: 50,
  });
const [userId, setUserId] = useState(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user.userId || '';
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
    }
  }
  return '';
});

  const [agreement, setAgreement] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setAgreement((e.target as HTMLInputElement).checked);
      return;
    }

    // For number inputs, convert to number
    if (type === 'number') {
      const numValue = value === '' ? 0 : parseFloat(value);
      
      // Calculate total amount when shares or price changes
      if (name === 'noOfShares' || name === 'pricePerShare') {
        const shares = name === 'noOfShares' ? numValue : formData.noOfShares;
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
    
    if (!agreement) {
      setSubmitMessage('Please agree to the terms first');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Prepare the data according to the API schema
      const tradeData = {
        companyName: formData.companyName,
        userId:userId,// Assuming userId is stored in localStorage
        action: formData.action,
        noOfShares: formData.noOfShares,
        pricePerShare: formData.pricePerShare,
        esgValue: formData.esgValue,
        timestamp: new Date().toISOString(),
      };
      
      const response = await fetch('/api/submitTrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tradeData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitMessage('Trade submitted successfully!');
        // Reset form
        setFormData({
          companyName: '',
          action: 'buy',
          noOfShares: 0,
          pricePerShare: 0,
          totalAmount: 0,
          esgValue: 50,
        });
        setAgreement(false);
      } else {
        setSubmitMessage(`Error: ${data.error || 'Failed to submit trade'}`);
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
                    name="action"
                    value="buy"
                    checked={formData.action === 'buy'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Buy
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="action"
                    value="sell"
                    checked={formData.action === 'sell'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Sell
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="noOfShares">
                Number of Shares
              </label>
              <input
                type="number"
                id="noOfShares"
                name="noOfShares"
                value={formData.noOfShares || ''}
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
              <label className="block text-gray-700 font-medium mb-2" htmlFor="esgValue">
                ESG Score: {formData.esgValue}
              </label>
              <input
                type="range"
                id="esgValue"
                name="esgValue"
                min="0"
                max="100"
                value={formData.esgValue}
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
                  checked={agreement}
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
              disabled={isSubmitting || !agreement}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : `${formData.action === 'buy' ? 'Buy' : 'Sell'} Shares`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}