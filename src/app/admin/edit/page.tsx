'use client';

import AdminSidebar from '@/components/AdminSidebar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditCompanyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    sector: '',
    description: '',
    stockPrice: '',
    esgScore: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/editCompany', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          sector: form.sector,
          description: form.description,
          stockPrice: Number(form.stockPrice),
          esgScore: Number(form.esgScore),
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Failed to update company');

      alert(result.message || 'Company updated successfully');
      router.push('/admin/companies');
    } catch (error: any) {
      alert(error.message || 'Error updating company');
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow text-black">
        <h1 className="text-2xl font-bold mb-6">Edit Company</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="sector"
            placeholder="Sector"
            value={form.sector}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
            required
          />
          <input
            name="stockPrice"
            type="number"
            placeholder="Stock Price"
            value={form.stockPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            min={0}
            step="0.01"
          />
          <input
            name="esgScore"
            type="number"
            placeholder="ESG Score"
            value={form.esgScore}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
            min={0}
            max={100}
            step="1"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
