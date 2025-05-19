'use client';
import React, { useEffect, useState } from 'react';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/companies');
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">All Companies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Symbol</th>
              <th className="p-3 border">Sector</th>
              <th className="p-3 border">Current Price</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="hover:bg-gray-50">
                <td className="p-3 border">{company.name}</td>
                <td className="p-3 border">{company.symbol}</td>
                <td className="p-3 border">{company.sector}</td>
                <td className="p-3 border">₹{company.currentPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
