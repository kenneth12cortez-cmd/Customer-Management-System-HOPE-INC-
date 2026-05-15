import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useRights } from "../lib/useRights";
import SkeletonRow from "../components/SkeletonRow";
import Toast from "../components/Toast";

export default function UserManagement() {
  const { rights, userType, loading: rightsLoading } = useRights();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .order("email");
    if (error) console.error(error.message);
    else setUsers(data || []);
    setLoading(false);
  }

  async function handleActivate(userId) {
    const { error } = await supabase
      .from("user")
      .update({ record_status: "ACTIVE" })
      .eq("id", userId);
    if (error) setToast({ message: "Failed to activate user.", type: "error" });
    else {
      setToast({ message: "User activated successfully.", type: "success" });
      fetchUsers();
    }
  }

  async function handleDeactivate(userId) {
    const { error } = await supabase
      .from("user")
      .update({ record_status: "INACTIVE" })
      .eq("id", userId);
    if (error) setToast({ message: "Failed to deactivate user.", type: "error" });
    else {
      setToast({ message: "User deactivated successfully.", type: "success" });
      fetchUsers();
    }
  }

  // Block access if no ADM_USER right
  if (!rightsLoading && rights.ADM_USER !== 1) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-4xl mb-4">🔒</p>
        <h2 className="text-xl font-bold text-gray-700">Access Denied</h2>
        <p className="text-gray-500 text-sm mt-2">You don't have permission to manage users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <span className="text-xs text-gray-400 italic">
          SUPERADMIN accounts are protected and cannot be modified
        </span>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="p-4 text-sm font-semibold text-gray-600">User Type</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading || rightsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} cols={4} />
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const isSuperAdminRow = user.user_type === "SUPERADMIN";
                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 ${isSuperAdminRow ? "opacity-60 bg-purple-50" : ""}`}
                  >
                    <td className="p-4 text-sm text-gray-800">{user.email}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        isSuperAdminRow ? "bg-purple-100 text-purple-700" :
                        user.user_type === "ADMIN" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {user.user_type}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <span className={`font-bold text-xs ${
                        user.record_status === "ACTIVE" ? "text-green-600" : "text-red-500"
                      }`}>
                        {user.record_status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {isSuperAdminRow ? (
                        // SUPERADMIN guard — tooltip explains why buttons are disabled
                        <div className="relative group inline-block">
                          <span className="text-xs text-gray-400 italic cursor-help">
                            🔒 Protected
                          </span>
                          <div className="absolute right-0 bottom-6 w-56 bg-gray-800 text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                            SUPERADMIN accounts cannot be activated or deactivated by anyone.
                          </div>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleActivate(user.id)}
                            disabled={user.record_status === "ACTIVE"}
                            className="text-green-600 hover:underline text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            Activate
                          </button>
                          <button
                            onClick={() => handleDeactivate(user.id)}
                            disabled={user.record_status === "INACTIVE"}
                            className="text-red-600 hover:underline text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            Deactivate
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}