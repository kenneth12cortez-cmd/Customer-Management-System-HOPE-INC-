export default function AddCustomerModal({ isOpen, onClose }) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
       
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer No (ID)</label>
            <input type="text" className="w-full border p-2 rounded mt-1" placeholder="e.g. C0083" required />
          </div>
         
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input type="text" className="w-full border p-2 rounded mt-1" required />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea className="w-full border p-2 rounded mt-1" rows="2"></textarea>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Pay Term</label>
            <select className="w-full border p-2 rounded mt-1">
              <option value="COD">COD</option>
              <option value="30D">30D</option>
              <option value="45D">45D</option>
            </select>
          </div>


          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

