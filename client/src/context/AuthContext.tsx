import { createContext, useContext, useState, type ReactNode } from "react";
import * as auth from "../services/auth";
import type { User } from "../types";

type AuthValue = {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logOut: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => auth.getSession());

  const value: AuthValue = {
    user,
    logIn: async (email, password) => setUser(await auth.logIn(email, password)),
    signUp: async (name, email, password) => setUser(await auth.signUp(name, email, password)),
    logOut: () => {
      auth.logOut();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
