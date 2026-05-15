import { useState, useEffect } from "react";
import { supabase } from "./supabase";

export function useRights() {
  const [rights, setRights] = useState({});
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRights();
  }, []);

  async function fetchRights() {
    setLoading(true);

    // Get current logged in user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    // Get user type from user table
    const { data: userRow } = await supabase
      .from("user")
      .select("user_type, record_status")
      .eq("id", user.id)
      .single();

    if (userRow) setUserType(userRow.user_type);

    // Get all rights for this user
    const { data: userRights } = await supabase
      .from("UserModule_Rights")
      .select("rightCode, right_value")
      .eq("userid", user.id);

    if (userRights) {
      const rightsMap = {};
      userRights.forEach(r => {
        rightsMap[r.rightCode] = r.right_value;
      });
      setRights(rightsMap);
    }

    setLoading(false);
  }

  return { rights, userType, loading };
}