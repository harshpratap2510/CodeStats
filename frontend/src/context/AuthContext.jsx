// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { safeGet } from "../lib/api";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // null => logged out
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await safeGet("/api/v1/users/profile"); // returns null on 401
        if (!cancelled) setUser(data?.user || null);
      } catch (e) {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const refresh = async () => {
    const data = await safeGet("/api/v1/users/profile");
    setUser(data?.user || null);
  };

  return (
    <AuthCtx.Provider value={{ user, setUser, loading, refresh }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}
