'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

export default function AddCompanyPage() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      alert('You are not authorized to view this page.');
      window.location.href = '/login';
    }
  }, []);

  const [form, setForm] = useState({
    name: '',
    sector: '',
    description: '',
    stockPrice: '',
    esgScore: '',
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

    const payload = {
      name: form.name,
      sector: form.sector,
      description: form.description,
      stockPrice: parseFloat(form.stockPrice),
      esgScore: parseFloat(form.esgScore),
    };

    try {
      const res = await fetch('/api/addCompany', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Company added successfully!');
        setForm({
          name: '',
          sector: '',
          description: '',
          stockPrice: '',
          esgScore: '',
        });
        
      } else {
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setMessage('Error adding company.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
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
              className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
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
            <label className="block text-sm font-medium text-gray-700">Stock Price</label>
            <input
              name="stockPrice"
              type="number"
              value={form.stockPrice}
              onChange={handleChange}
              required
              className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ESG Score (0 - 100)</label>
            <input
              name="esgScore"
              type="number"
              min="0"
              max="100"
              value={form.esgScore}
              onChange={handleChange}
              required
              className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
              className="mt-1 block w-full text-black border border-gray-300 rounded-md p-2"
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
