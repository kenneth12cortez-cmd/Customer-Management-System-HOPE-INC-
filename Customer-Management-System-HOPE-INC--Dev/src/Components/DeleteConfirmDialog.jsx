export default function DeleteConfirmDialog({ isOpen, onClose, customerName, onConfirm }) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-gray-100">
        <div className="flex items-center gap-3 text-red-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 17c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-bold">Confirm Deactivation</h3>
        </div>
       
        <p className="text-gray-600">
          Are you sure you want to move <span className="font-semibold text-gray-900">{customerName}</span> to the
          <span className="text-red-600"> Deleted Customers</span> list?
        </p>


        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 shadow-md transition-all"
          >
            Yes, Deactivate
          </button>
        </div>
      </div>
    </div>
  );
}

