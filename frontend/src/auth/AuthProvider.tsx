import { useCallback, useEffect, useState } from "react";
import type { AuthProviderProps, User } from "./types";
import { getMe, login, logout } from "../service/auth/auth.service";
import { AuthContext } from "./AuthContext";
import { subscribeAuthError } from "../events/authEvents";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeAuthError(() => {
      setUser(null);
    });

    return () => unsubscribe?.();
  }, []);

  const signIn = useCallback(async (email: string, senha: string) => {
    await login(email, senha);
    const userData = await getMe();
    setUser(userData);
  }, []);

  const signOut = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
