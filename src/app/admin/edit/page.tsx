'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditCompanyPage() {
  const { id } = useParams();
  const router = useRouter();

  // Initial empty form; you can fill it by your API later
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    sector: '',
    currentPrice: '',
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Placeholder submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your API call to update company here
    console.log('Update company:', form);
    // Example navigation after submit
    router.push('/admin/companies');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Company {id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="symbol"
          placeholder="Symbol"
          value={form.symbol}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="sector"
          placeholder="Sector"
          value={form.sector}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="currentPrice"
          type="number"
          placeholder="Current Price"
          value={form.currentPrice}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}
