import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRights } from "../lib/useRights";
import AddCustomerModal from "../components/AddCustomerModal";
import EditCustomerModal from "../components/EditCustomerModal";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import Toast from "../components/Toast";
import SkeletonRow from "../components/SkeletonRow";

export default function Customers() {
  const { rights, userType, loading: rightsLoading } = useRights();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  // Rights gates
  const canAdd = rights.CUST_ADD === 1;
  const canEdit = rights.CUST_EDIT === 1;
  const canDelete = rights.CUST_DEL === 1;
  const isAdmin = userType === "ADMIN" || userType === "SUPERADMIN";

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);
    let query = supabase.from("customer").select("*").order("custno");
    if (userType === "USER") query = query.eq("record_status", "ACTIVE");
    const { data, error } = await query;
    if (error) setToast({ message: "Failed to load customers.", type: "error" });
    else setCustomers(data || []);
    setLoading(false);
  }

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };

  const confirmSoftDelete = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("customer")
      .update({
        record_status: "INACTIVE",
        stamp: `Soft-deleted by ${user?.email} on ${new Date().toISOString()}`
      })
      .eq("custno", selectedCustomer.custno);

    if (error) setToast({ message: "Failed to delete customer.", type: "error" });
    else {
      setToast({ message: "Customer deleted successfully.", type: "success" });
      setIsDeleteOpen(false);
      fetchCustomers();
    }
  };

  const filtered = customers.filter(c =>
    c.custname?.toLowerCase().includes(search.toLowerCase()) ||
    c.payterm?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        {/* Add button gated by CUST_ADD right */}
        {canAdd && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            + Add Customer
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search by name or pay term..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">ID</th>
              <th className="p-4 font-semibold text-gray-600">Customer Name</th>
              <th className="p-4 font-semibold text-gray-600">Address</th>
              <th className="p-4 font-semibold text-gray-600">Pay Term</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              {/* Stamp column gated for ADMIN/SUPERADMIN */}
              {isAdmin && <th className="p-4 font-semibold text-gray-600">Stamp</th>}
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading || rightsLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} cols={isAdmin ? 7 : 6} />
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 7 : 6} className="p-8 text-center text-gray-400">
                  No customers found.
                </td>
              </tr>
            ) : (
              filtered.map((customer) => (
                <tr key={customer.custno} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-mono text-gray-500">{customer.custno}</td>
                  <td className="p-4 font-medium text-gray-900">
                    <a href={`/customers/${customer.custno}`} className="hover:text-blue-600 hover:underline">
                      {customer.custname}
                    </a>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{customer.address}</td>
                  <td className="p-4 text-sm">{customer.payterm}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold ${customer.record_status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'}`}>
                      {customer.record_status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="p-4 text-xs text-gray-400">{customer.stamp || '—'}</td>
                  )}
                  <td className="p-4 text-right space-x-3">
                    {/* Edit button gated by CUST_EDIT right */}
                    {canEdit && (
                      <button
                        onClick={() => handleEdit(customer)}
                        className="text-blue-600 hover:underline text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                    {/* Delete button gated by CUST_DEL right */}
                    {canDelete && customer.record_status === 'ACTIVE' && (
                      <button
                        onClick={() => handleDelete(customer)}
                        className="text-red-600 hover:underline text-sm font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddCustomerModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={fetchCustomers}
      />
      <EditCustomerModal
        isOpen={isEditOpen}
        customerData={selectedCustomer}
        onClose={() => setIsEditOpen(false)}
        onSuccess={fetchCustomers}
      />
      <DeleteConfirmDialog
        isOpen={isDeleteOpen}
        customerName={selectedCustomer?.custname}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmSoftDelete}
      />
    </div>
  );
}