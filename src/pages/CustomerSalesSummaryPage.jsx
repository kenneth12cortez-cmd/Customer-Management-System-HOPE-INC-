import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function CustomerSalesSummaryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await supabase
      .from("customer_sales_summary").select("*");
    if (error) console.error(error.message);
    else setData(data || []);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Customer Sales Summary</h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No data found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Customer No</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Customer Name</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Total Orders</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-mono text-blue-600">{row.custno}</td>
                  <td className="p-4 text-sm text-gray-800">{row.custname}</td>
                  <td className="p-4 text-sm text-right font-bold">{row.total_orders}</td>
                  <td className="p-4 text-sm text-right font-bold">
                    ₱{Number(row.total_spent).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
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