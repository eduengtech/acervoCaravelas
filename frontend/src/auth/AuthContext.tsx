import { createContext } from "react";
import type { AuthContextData } from "./types";

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
