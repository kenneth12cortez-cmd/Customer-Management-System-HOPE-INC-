import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import SalesHistoryPanel from "../components/SalesHistoryPanel";
import SalesDetailModal from "../components/SalesDetailModal";

export default function CustomerDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrans, setSelectedTrans] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  async function fetchCustomer() {
    setLoading(true);
    const { data, error } = await supabase
      .from("customer")
      .select("*")
      .eq("custno", id)
      .single();

    if (error) console.error("Error fetching customer:", error.message);
    else setCustomer(data);
    setLoading(false);
  }

  const handleViewItems = (transNo) => {
    setSelectedTrans(transNo);
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-8 text-center text-gray-400">Loading customer...</div>;
  if (!customer) return <div className="p-8 text-center text-red-400">Customer not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500">
        <Link to="/customers" className="hover:text-blue-600">Customers</Link>
        {" / "}
        <span className="text-gray-800">{customer.custname}</span>
      </nav>

      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{customer.custname}</h1>
          <p className="text-gray-500 font-mono mt-1">ID: {customer.custno}</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 uppercase text-xs font-bold">Address</p>
              <p className="text-gray-700">{customer.address || '—'}</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-xs font-bold">Payment Term</p>
              <p className="text-gray-700">{customer.payterm}</p>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          customer.record_status === 'ACTIVE'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {customer.record_status}
        </span>
      </div>

      {/* Sales History Panel */}
      <SalesHistoryPanel
        custno={customer.custno}
        onViewDetail={handleViewItems}
      />

      {/* Transaction Detail Modal */}
      <SalesDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transNo={selectedTrans}
      />
    </div>
  );
}