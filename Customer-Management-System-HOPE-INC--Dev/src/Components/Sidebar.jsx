import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { name: "Dashboard",       path: "/",                       icon: "📊" },
    { name: "Customers",       path: "/customers",              icon: "👥" },
    { name: "Products",        path: "/products",               icon: "📦" },
    { name: "Sales",           path: "/sales",                  icon: "💰" },
    { name: "Deleted",         path: "/deleted-customers",      icon: "🗑️" },
    { name: "Admin - Users",   path: "/admin/users",            icon: "🔐" },
    { name: "Customer Sales",  path: "/reports/customer-sales", icon: "📈" },
    { name: "Product Revenue", path: "/reports/product-revenue",icon: "💹" },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-5 flex flex-col">
      <h1 className="text-xl font-bold mb-8 px-2 border-l-4 border-blue-500 ml-2">HOPE CMS</h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
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
  );
}