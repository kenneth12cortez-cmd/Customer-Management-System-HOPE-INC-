import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function SalesHistoryPanel({ custno, onViewDetail }) {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (custno) fetchSalesHistory();
  }, [custno]);

  async function fetchSalesHistory() {
    setLoading(true);
    const { data, error } = await supabase
      .from("sales")
      .select("transno, salesdate, empno")
      .eq("custno", custno)
      .order("salesdate", { ascending: false });

    if (error) console.error("Sales history error:", error.message);
    else setSales(data || []);
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm mt-6">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-bold text-gray-700">Transaction History</h3>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-400 text-sm">Loading transactions...</div>
        ) : sales.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No transactions found.</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b">
              <tr>
                <th className="p-4">Trans No</th>
                <th className="p-4">Date</th>
                <th className="p-4">Emp No</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.transno} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-4 font-mono text-blue-600 font-bold">{sale.transno}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(sale.salesdate).toLocaleDateString("en-PH")}
                  </td>
                  <td className="p-4 text-gray-600">{sale.empno}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onViewDetail(sale.transno)}
                      className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded"
                    >
                      View Items
                    </button>
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