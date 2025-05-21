'use client';
import AdminSidebar from '@/components/AdminSidebar';
import React, { useEffect, useState } from 'react';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      alert('You are not authorized to view this page.');
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('/api/getAllCompanies');
        const data = await res.json();
        setCompanies(data.companies);
      } catch (err) {
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 mt-10 p-6 bg-white text-black rounded shadow mx-6">
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
                <th className="p-3 border">Sector</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Stock Price (₹)</th>
                <th className="p-3 border">ESG Score</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{company.name}</td>
                  <td className="p-3 border">{company.sector}</td>
                  <td className="p-3 border">{company.description}</td>
                  <td className="p-3 border">₹{company.stockPrice}</td>
                  <td className="p-3 border">{company.esgScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
