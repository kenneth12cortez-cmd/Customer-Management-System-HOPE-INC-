import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";


export default function Navbar() {
  const [user, setUser] = useState(null);


  // Get current user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };


    getUser();
  }, []);


  // Logout function
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
          {user?.email ? user.email : "Loading..."}
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

