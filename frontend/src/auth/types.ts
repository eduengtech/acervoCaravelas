import type { ReactNode } from "react";

export interface User {
    id: string;
    email: string
    role: string;
}

export interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    signIn(email:string, senha: string): Promise <void>;
    signOut(): Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}