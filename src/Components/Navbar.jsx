import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes (catches Google OAuth redirect)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      {/* Left: System Title */}
      <h1 className="text-xl font-semibold">
        HOPE INC. CMS
      </h1>

      {/* Right: User Info + Logout */}
      <div className="flex items-center gap-4">

        {/* User Email */}
        <span className="text-gray-600 text-sm">
          {user?.email ?? user?.user_metadata?.full_name ?? "Guest"}
        </span>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
}