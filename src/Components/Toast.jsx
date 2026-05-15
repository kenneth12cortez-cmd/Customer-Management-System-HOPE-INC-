import { useEffect } from "react";

export default function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl text-white text-sm font-medium flex items-center gap-3 ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    }`}>
      <span>{type === "error" ? "❌" : "✅"}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">✕</button>
    </div>
  );
}