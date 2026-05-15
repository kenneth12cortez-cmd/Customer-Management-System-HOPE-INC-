export default function DeletedCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-red-800">Deleted Customers</h1>
        <p className="text-sm text-gray-500">
          List of deactivated accounts. Only Administrators can recover these records.
        </p>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-red-50 border-b border-red-100">
            <tr>
              <th className="p-4 font-semibold text-red-900 text-sm">ID</th>
              <th className="p-4 font-semibold text-red-900 text-sm">Customer Name</th>
              <th className="p-4 font-semibold text-red-900 text-sm">Deactivated Date</th>
              <th className="p-4 font-semibold text-red-900 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Example Row */}
            <tr className="hover:bg-red-50/30 transition-colors">
              <td className="p-4 text-sm font-mono text-gray-500">C0042</td>
              <td className="p-4 text-sm text-gray-800 font-medium">Old Client Inc.</td>
              <td className="p-4 text-sm text-gray-500">2026-03-15</td>
              <td className="p-4 text-right">
                <button
                  className="bg-white border border-green-600 text-green-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-green-600 hover:text-white transition-all"
                  onClick={() => alert("Recovery logic will be wired by M3 (DB Engineer)")}
                >
                  Recover Account
                </button>
              </td>
            </tr>
          </tbody>
        </table>
       
        {/* Empty State */}
        <div className="hidden p-12 text-center">
          <p className="text-gray-400">No deactivated customers found.</p>
        </div>
      </div>
    </div>
  );
}

