import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SalesHistoryPanel from "../components/SalesHistoryPanel";
import SalesDetailModal from "../components/SalesDetailModal";


export default function CustomerDetail() {
  const { id } = useParams(); // Gets the ID from the URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrans, setSelectedTrans] = useState(null);


  const handleViewItems = (transNo) => {
    setSelectedTrans(transNo);
    setIsModalOpen(true);
  };


  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500">
        <Link to="/customers" className="hover:text-blue-600">Customers</Link> / <span className="text-gray-800">Detail</span>
      </nav>


      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Example Corp</h1>
          <p className="text-gray-500 font-mono mt-1">ID: {id || 'C0001'}</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 uppercase text-xs font-bold">Address</p>
              <p className="text-gray-700">123 Manila St., Philippines</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase text-xs font-bold">Payment Term</p>
              <p className="text-gray-700">30 Days (30D)</p>
            </div>
          </div>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">ACTIVE</span>
      </div>


      {/* Embedded Sales History (PR-03 Requirement) */}
      <SalesHistoryPanel onViewDetail={handleViewItems} />


      {/* Modal for Transaction Details */}
      <SalesDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transNo={selectedTrans}
      />
    </div>
  );
}

