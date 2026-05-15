import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function SalesDetailModal({ isOpen, onClose, transNo }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && transNo) fetchSalesDetail();
  }, [isOpen, transNo]);

  async function fetchSalesDetail() {
    setLoading(true);
    const { data, error } = await supabase
      .from("salesdetail")
      .select("transno, prodcode, quantity")
      .eq("transno", transNo);

    if (error) console.error("Sales detail error:", error.message);
    else setItems(data || []);
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Details: {transNo}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="p-5">
          {loading ? (
            <div className="text-center py-6 text-gray-400 text-sm">Loading items...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-sm">No items found.</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b text-gray-400">
                <tr>
                  <th className="pb-2">Product Code</th>
                  <th className="pb-2 text-right">Qty</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 font-mono text-blue-600">{item.prodcode}</td>
                    <td className="py-3 text-right font-bold">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="p-5 border-t bg-gray-50 flex justify-end">
          <button onClick={onClose} className="bg-gray-800 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
}