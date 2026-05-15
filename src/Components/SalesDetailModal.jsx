export default function SalesDetailModal({ isOpen, onClose, transNo }) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Details: {transNo}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="p-5">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-gray-400">
              <tr>
                <th className="pb-2">Description</th>
                <th className="pb-2 text-right">Qty</th>
                <th className="pb-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3">Sample Product</td>
                <td className="py-3 text-right">5</td>
                <td className="py-3 text-right">₱500.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-5 border-t bg-gray-50 flex justify-end">
          <button onClick={onClose} className="bg-gray-800 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
}

