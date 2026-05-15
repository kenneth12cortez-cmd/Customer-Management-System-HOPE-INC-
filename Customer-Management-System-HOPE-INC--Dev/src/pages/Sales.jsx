import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRights } from "../lib/useRights";
import SkeletonRow from "../components/SkeletonRow";

export default function Sales() {
  const { rights, loading: rightsLoading } = useRights();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSales();
  }, []);

  async function fetchSales() {
    setLoading(true);
    const { data, error } = await supabase
      .from("sales")
      .select(`transNo, salesDate, empNo, custNo, customer (custname)`)
      .order("salesDate", { ascending: false });

    if (error) console.error("Error fetching sales:", error.message);
    else setSales(data || []);
    setLoading(false);
  }

  const filtered = sales.filter(s =>
    s.transNo?.toLowerCase().includes(search.toLowerCase()) ||
    s.customer?.custname?.toLowerCase().includes(search.toLowerCase())
  );

  // Block access if no SALES_VIEW right
  if (!rightsLoading && rights.SALES_VIEW !== 1) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-4xl mb-4">🔒</p>
        <h2 className="text-xl font-bold text-gray-700">Access Denied</h2>
        <p className="text-gray-500 text-sm mt-2">You don't have permission to view Sales.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Sales Transactions</h1>
        <p className="text-sm text-gray-500">View all company sales records and transaction history.</p>
      </div>

      <input
        type="text"
        placeholder="Search by transaction no or customer name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600 text-sm">Trans No</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Customer</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Emp No</th>
              <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading || rightsLoading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} cols={4} />)
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">No sales records found.</td>
              </tr>
            ) : (
              filtered.map((sale) => (
                <tr key={sale.transNo} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-mono text-blue-600">{sale.transNo}</td>
                  <td className="p-4 text-sm text-gray-800 font-medium">
                    {sale.customer?.custname || sale.custNo}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{sale.empNo}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(sale.salesDate).toLocaleDateString("en-PH")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}