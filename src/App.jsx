import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import DeletedCustomers from "./pages/DeletedCustomers";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallback";
import UserManagement from "./pages/UserManagement";
import CustomerSalesSummaryPage from "./pages/CustomerSalesSummaryPage";
import ProductRevenuePage from "./pages/ProductRevenuePage";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const authPaths = ["/login", "/register", "/auth/callback"];
  const isAuthPage = authPaths.includes(location.pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
  const currentUser = { user_type: 'ADMIN', rights: { cust_del: 1 } };

  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/deleted-customers" element={
            currentUser?.user_type === 'USER'
              ? <Navigate to="/customers" />
              : <DeletedCustomers />
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/reports/customer-sales" element={<CustomerSalesSummaryPage />} />
          <Route path="/reports/product-revenue" element={<ProductRevenuePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <h2 className="text-4xl font-bold text-gray-300">404</h2>
              <p className="text-gray-500">Page not found.</p>
            </div>
          } />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;