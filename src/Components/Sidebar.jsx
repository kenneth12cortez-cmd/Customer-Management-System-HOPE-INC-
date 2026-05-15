import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useRights } from "../lib/useRights";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { rights, userType } = useRights();

  const isAdmin = userType === "ADMIN" || userType === "SUPERADMIN";
  const hasAdminRight = rights.ADM_USER === 1;

  const links = [
    { name: "Dashboard",       path: "/",                        icon: "📊", show: true },
    { name: "Customers",       path: "/customers",               icon: "👥", show: true },
    { name: "Products",        path: "/products",                icon: "📦", show: true },
    { name: "Sales",           path: "/sales",                   icon: "💰", show: true },
    { name: "Deleted",         path: "/deleted-customers",       icon: "🗑️", show: isAdmin },
    // Admin link gated by ADM_USER right
    { name: "Admin - Users",   path: "/admin/users",             icon: "🔐", show: hasAdminRight },
    { name: "Customer Sales",  path: "/reports/customer-sales",  icon: "📈", show: true },
    { name: "Product Revenue", path: "/reports/product-revenue", icon: "💹", show: true },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        w-64 h-screen bg-slate-900 text-white p-5 flex flex-col
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <h1 className="text-xl font-bold mb-8 px-2 border-l-4 border-blue-500 ml-2">HOPE CMS</h1>
        <nav className="flex flex-col gap-2">
          {links.filter(link => link.show).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive ? "bg-blue-600 text-white shadow-lg" : "hover:bg-slate-800 text-slate-400"
                }`
              }
            >
              <span>{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}