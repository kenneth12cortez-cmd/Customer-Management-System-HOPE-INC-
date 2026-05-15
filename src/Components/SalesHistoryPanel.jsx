export default function SalesHistoryPanel({ onViewDetail }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm mt-6">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-bold text-gray-700">Transaction History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b">
            <tr>
              <th className="p-4">Trans No</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50 text-sm">
              <td className="p-4 font-mono text-blue-600 font-bold">TRX-2026-001</td>
              <td className="p-4 text-gray-600">2026-04-21</td>
              <td className="p-4 text-right">
                <button
                  onClick={() => onViewDetail("TRX-2026-001")}
                  className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded"
                >
                  View Items
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

