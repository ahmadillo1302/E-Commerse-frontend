"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useGetUserQuery } from "@/lib/services/api";

interface User {
  id: string;
  first_name: string;
}

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const { data: user } = useGetUserQuery(userId!, { skip: !userId });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decodedToken: { id: string } = jwtDecode(token);
          setUserId(decodedToken.id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  return { user, logout };
}
