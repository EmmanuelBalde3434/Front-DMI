import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  login as loginService,
  register as registerService,
  verifyOtp as verifyOtpService,
  logout as logoutService,
  secureAccesToken,
  secureRefreshToken,
  secureUserData,
  getStoredUser,
} from "../services/authServices";
import type { User } from "./types";

export type AuthContextType = {
  user: User | null;
  pendingOtpUserId: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ userId?: string; error?: string }>;
  verifyOtp: (userId: string, otpCode: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_KEY = "medapp_session_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingOtpUserId, setPendingOtpUserId] = useState<string | null>(null); // <-- nuevo


  // Al montar, intentamos recuperar usuario desde AsyncStorage (session) o desde SecureStore
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SESSION_KEY);
        if (raw) {
          setUser(JSON.parse(raw));
          return;
        }
        // fallback: leer usuario seguro (SecureStore)
        const secureUser = await getStoredUser();
        if (secureUser) {
          setUser(secureUser);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // LOGIN: llama al endpoint que envía OTP. No guarda tokens aquí, sólo retorna userId.
  const login = async (email: string, password: string) => {
    //setLoading(true);
    try {
      const res = await loginService(email, password);
      if (res?.userId) {
        setPendingOtpUserId(String(res.userId));
        return { userId: res.userId };
      }
      return { error: res?.message || "Error en login" };
    } catch (err: any) {
      return { error: err?.message || "Error en login" };
    } finally {
      //setLoading(false);
    }
  };

  // verifyOtp: completa autenticación, recibe tokens y user -> guardamos tokens y session
  const verifyOtp = async (userId: string, otpCode: string) => {
    setLoading(true);
    try {
      const res = await verifyOtpService(userId, otpCode);
      if (!res?.accessToken || !res?.refreshToken) {
        return { ok: false, error: res?.message || "OTP inválido" };
      }

      const dataUser = {
        id: String(res.user.id),
        email: res.user.email,
        name: res.user.name,
      };

      await secureAccesToken(res.accessToken);
      await secureRefreshToken(res.refreshToken);
      await secureUserData(dataUser);

      setUser(dataUser);
      setPendingOtpUserId(null);
      return { ok: true };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const data = await registerService(name, email, password);
      // tu backend actual devuelve sólo { message, user } al registrar.
      // Recomendación: redirigir al login para que usuario haga el proceso normal (login->OTP)
      if (data?.user) {
        // opcional: guardar usuario temporal localmente para mostrar en UI
        const dataUser = {
          id: String(data.user.id),
          email: data.user.email,
          name: data.user.name,
        };
        // No guardamos tokens porque no fueron devueltos por backend.
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(dataUser));
        setUser(dataUser);
        return { ok: true };
      }
      return { ok: false, error: data?.message || "Error al registrar" };
    } catch (err: any) {
      return { ok: false, error: err?.message || "Error al registrar" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutService();
      setUser(null);
      await AsyncStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(() => ({ user, loading, login, verifyOtp, register, logout, pendingOtpUserId }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
