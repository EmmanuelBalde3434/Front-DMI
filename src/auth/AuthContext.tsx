import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  secureAccesToken,
  secureUserData,
} from "../services/authServices";
import type { User } from "./types";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_KEY = "medapp_session_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SESSION_KEY);
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
  setLoading(true);
  try {
    const data = await loginService(email, password);

    const dataUser = {
      id: String(data.user.id),
      email: data.user.email,
      name: data.user.name,
    };

    setUser(dataUser);

    await secureAccesToken(data.accessToken);

    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(dataUser));
  } finally {
    setLoading(false);
  }
};


  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await registerService(name, email, password);

      const dataUser = {
        id: data.user?.id,
        email: data.user?.email,
        name: data.user?.name,
      };
      setUser(dataUser);

      await secureAccesToken(data.token);
      await secureUserData(dataUser);
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(dataUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
