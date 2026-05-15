import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function DeletedCustomers() {
  const [deletedCustomers, setDeletedCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchDeletedCustomers();
  }, []);

  async function fetchCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("id", user.id)
        .single();
      setCurrentUser(data);
    }
  }

  async function fetchDeletedCustomers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("customer")
      .select("*")
      .eq("record_status", "INACTIVE")
      .order("custno");

    if (error) console.error("Error fetching deleted customers:", error.message);
    else setDeletedCustomers(data || []);
    setLoading(false);
  }

  async function handleRecover(customer) {
    const { error } = await supabase
      .from("customer")
      .update({
        record_status: "ACTIVE",
        stamp: `Recovered by ${currentUser?.email} on ${new Date().toISOString()}`
      })
      .eq("custno", customer.custno);

    if (error) console.error("Recovery error:", error.message);
    else fetchDeletedCustomers();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-red-800">Deleted Customers</h1>
        <p className="text-sm text-gray-500">
          List of deactivated accounts. Only Administrators can recover these records.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading deleted customers...</div>
        ) : deletedCustomers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-400">No deactivated customers found.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-red-50 border-b border-red-100">
              <tr>
                <th className="p-4 font-semibold text-red-900 text-sm">ID</th>
                <th className="p-4 font-semibold text-red-900 text-sm">Customer Name</th>
                <th className="p-4 font-semibold text-red-900 text-sm">Address</th>
                <th className="p-4 font-semibold text-red-900 text-sm">Stamp</th>
                <th className="p-4 font-semibold text-red-900 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deletedCustomers.map((customer) => (
                <tr key={customer.custno} className="hover:bg-red-50/30 transition-colors">
                  <td className="p-4 text-sm font-mono text-gray-500">{customer.custno}</td>
                  <td className="p-4 text-sm text-gray-800 font-medium">{customer.custname}</td>
                  <td className="p-4 text-sm text-gray-600">{customer.address}</td>
                  <td className="p-4 text-xs text-gray-400">{customer.stamp || '—'}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleRecover(customer)}
                      className="bg-white border border-green-600 text-green-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-green-600 hover:text-white transition-all"
                    >
                      Recover Account
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