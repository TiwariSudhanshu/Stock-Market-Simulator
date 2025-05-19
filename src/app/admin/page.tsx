'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

export default function AddCompanyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    symbol: '',
    sector: '',
    description: '',
    currentPrice: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Company added successfully!');
        router.push('/admin/companies');
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('Error adding company.');
    } finally {
      setLoading(false);
    }
  };

  return (
 <div className="flex">
    <AdminSidebar/>
       <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg flex-grow mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <PlusCircle className="mr-2 text-green-600" />
        Add New Company
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Symbol</label>
          <input
            name="symbol"
            value={form.symbol}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sector</label>
          <input
            name="sector"
            value={form.sector}
            onChange={handleChange}
            required
            className="mt-1 block text-black w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Price</label>
          <input
            name="currentPrice"
            type="number"
            value={form.currentPrice}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Add Company'}
          </button>
          {message && <p className="text-sm text-gray-600">{message}</p>}
        </div>
      </form>
    </div>
 </div>
  );
}
