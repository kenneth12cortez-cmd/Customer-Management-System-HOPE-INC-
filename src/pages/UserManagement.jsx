import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  async function fetchCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("user").select("*").eq("id", user.id).single();
      setCurrentUser(data);
    }
  }

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("user").select("*").order("email");
    if (error) console.error(error.message);
    else setUsers(data || []);
    setLoading(false);
  }

  async function handleActivate(userId) {
    await supabase.from("user")
      .update({ record_status: "ACTIVE" }).eq("id", userId);
    fetchUsers();
  }

  async function handleDeactivate(userId) {
    await supabase.from("user")
      .update({ record_status: "INACTIVE" }).eq("id", userId);
    fetchUsers();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No users found.</div>
        ) : (
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
              {users.map((user) => {
                const isSuperAdminRow = user.user_type === "SUPERADMIN";
                return (
                  <tr key={user.id} className={`hover:bg-gray-50 ${isSuperAdminRow ? "opacity-60" : ""}`}>
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
                        <span className="text-xs text-gray-400 italic">Protected</span>
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
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}