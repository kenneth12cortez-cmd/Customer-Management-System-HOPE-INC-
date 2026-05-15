import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function ProductRevenuePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await supabase
      .from("product_revenue").select("*");
    if (error) console.error(error.message);
    else setData(data || []);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Product Revenue</h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Product Code</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Description</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Unit</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Qty Sold</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-mono text-blue-600">{row.prodCode}</td>
                  <td className="p-4 text-sm text-gray-800">{row.description}</td>
                  <td className="p-4 text-sm text-gray-500">{row.unit}</td>
                  <td className="p-4 text-sm text-right">{row.total_qty_sold}</td>
                  <td className="p-4 text-sm text-right font-bold">
                    ₱{Number(row.total_revenue).toLocaleString("en-PH", { minimumFractionDigits: 2 })}
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