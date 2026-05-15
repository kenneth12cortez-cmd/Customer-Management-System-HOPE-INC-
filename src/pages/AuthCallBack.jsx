import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  useEffect(() => {
    handleCallback();
  }, []);

  async function handleCallback() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      window.location.href = "/login";
      return;
    }

    const { data: existing } = await supabase
      .from("user")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!existing) {
      await supabase.from("user").insert({
        id: user.id,
        email: user.email,
        username: user.email.split("@")[0],
        first_name: user.user_metadata?.full_name?.split(" ")[0] || "",
        last_name: user.user_metadata?.full_name?.split(" ")[1] || "",
        user_type: "USER",
        record_status: "INACTIVE",
        stamp: `Google OAuth on ${new Date().toISOString()}`
      });

      const { data: allRights } = await supabase
        .from("rights")
        .select("rightCode");

      if (allRights) {
        const rightRows = allRights.map(r => ({
          userid: user.id,
          rightCode: r.rightCode,
          right_value: 0
        }));
        await supabase.from("UserModule_Rights").insert(rightRows);
      }
    }

    window.location.href = "/";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">Verifying session...</h2>
      <p className="text-gray-500">Please wait while we log you in.</p>
    </div>
  );
}