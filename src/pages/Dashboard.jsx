import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [customerCount, setCustomerCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [salesCount, setSalesCount] = useState(null);
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);

    // Total active customers
    const { count: custCount } = await supabase
      .from("customer")
      .select("*", { count: "exact", head: true })
      .eq("record_status", "ACTIVE");

    // Total products
    const { count: prodCount } = await supabase
      .from("product")
      .select("*", { count: "exact", head: true });

    // Total sales count + recent 5
    const { data: salesData, count: salCount } = await supabase
      .from("sales")
      .select("transno, salesdate, custno", { count: "exact" })
      .order("salesdate", { ascending: false })
      .limit(5);

    setCustomerCount(custCount || 0);
    setProductCount(prodCount || 0);
    setSalesCount(salCount || 0);
    setRecentSales(salesData || []);
    setLoading(false);
  }

  const stats = [
    { label: "Total Customers", value: loading ? "..." : customerCount, color: "bg-blue-500" },
    { label: "Total Products",  value: loading ? "..." : productCount,  color: "bg-green-500" },
    { label: "Total Sales",     value: loading ? "..." : salesCount,    color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">HOPE INC. Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here is what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-lg opacity-20`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">Recent Sales</h2>
          {loading ? (
            <p className="text-sm text-gray-400">Loading...</p>
          ) : recentSales.length === 0 ? (
            <p className="text-sm text-gray-400">No sales records found.</p>
          ) : (
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.transno} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{sale.custno}</p>
                    <p className="text-xs text-gray-500 font-mono">{sale.transno}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(sale.salesdate).toLocaleDateString("en-PH")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-sm text-white">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/customers")}
              className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 text-sm transition"
            >
              View Customers
            </button>
            <button
              onClick={() => navigate("/sales")}
              className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 text-sm transition"
            >
              View Sales
            </button>
            <button
              onClick={() => navigate("/products")}
              className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 text-sm transition"
            >
              View Products
            </button>
            <button
              onClick={() => navigate("/deleted")}
              className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 text-sm transition"
            >
              Deleted Customers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}