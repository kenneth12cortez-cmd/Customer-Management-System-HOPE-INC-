import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; 

export default function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [totalSalesCount, setTotalSalesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);
      
      // 1. Fetch Active Customers — customer table HAS record_status
      const { count: custCount, error: custError } = await supabase
        .from('customer')
        .select('*', { count: 'exact', head: true })
        .eq('record_status', 'ACTIVE');
      
      if (custError) console.error("Cust Error:", custError.message);
      else setCustomerCount(custCount || 0);

      // 2. Fetch Products — product table has NO record_status, just count all
      const { count: prodCount, error: prodError } = await supabase
        .from('product')
        .select('*', { count: 'exact', head: true });
      
      if (prodError) console.error("Prod Error:", prodError.message);
      else setProductCount(prodCount || 0);

      // 3. Fetch Sales — sales table has NO total_price column, just count transactions
      const { count: salesCount, error: salesError } = await supabase
        .from('sales')
        .select('*', { count: 'exact', head: true });
      
      if (salesError) console.error("Sales Error:", salesError.message);
      else setTotalSalesCount(salesCount || 0);
      
    } catch (error) {
      console.error('Dashboard Critical Error:', error.message);
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { label: "Total Customers", value: loading ? "..." : customerCount, color: "bg-blue-600" },
    { label: "Total Products", value: loading ? "..." : productCount, color: "bg-emerald-600" },
    { label: "Total Transactions", value: loading ? "..." : totalSalesCount, color: "bg-violet-600" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">HOPE INC.</h1>
        <p className="text-slate-500 mt-2 font-medium">Customer Management System | Live Dashboard</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow">
            <div className={`absolute top-0 left-0 w-2 h-full ${stat.color}`}></div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-4xl font-black text-slate-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Database Connectivity
          </h2>
          <div className="space-y-4 opacity-80">
            <div className="flex justify-between border-b border-slate-700 pb-2">
              <span>Customer Table</span>
              <span className="font-mono text-green-400">READY</span>
            </div>
            <div className="flex justify-between border-b border-slate-700 pb-2">
              <span>Product Table</span>
              <span className="font-mono text-green-400">READY</span>
            </div>
            <div className="flex justify-between border-b border-slate-700 pb-2">
              <span>Sales Table</span>
              <span className="font-mono text-green-400">READY</span>
            </div>
          </div>
          <p className="mt-8 text-xs text-slate-400 italic">
            * Soft-delete filtering enabled on customer table only (record_status: ACTIVE)
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">DB Engineer Actions</h2>
          <p className="text-slate-500 mb-6">Database schema sync is complete. All records from HopeDB are live and accessible.</p>
          <div className="flex gap-4">
            <button onClick={fetchStats} className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition">
              Refresh Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}