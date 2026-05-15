import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Sales() {
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
      .select("transno, salesdate, empno, custno")
      .order("salesdate", { ascending: false });

    if (error) console.error("Error fetching sales:", error.message);
    else setSales(data || []);
    setLoading(false);
  }

  const filtered = sales.filter(s =>
    s.transno?.toLowerCase().includes(search.toLowerCase()) ||
    s.custno?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Sales Transactions</h1>
        <p className="text-sm text-gray-500">View all company sales records and transaction history.</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by transaction no or customer no..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading sales...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No sales records found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600 text-sm">Trans No</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Customer No</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Emp No</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((sale) => (
                <tr key={sale.transno} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-mono text-blue-600">{sale.transno}</td>
                  <td className="p-4 text-sm text-gray-800">{sale.custno}</td>
                  <td className="p-4 text-sm text-gray-600">{sale.empno}</td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(sale.salesdate).toLocaleDateString("en-PH")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}