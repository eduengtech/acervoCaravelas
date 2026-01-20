import type { ReactNode } from "react";

export type UserRole = "ADMIN" | "EDITOR";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  avatarUrl?: string | null;
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn(email: string, senha: string): Promise<void>;
  signOut(): Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
