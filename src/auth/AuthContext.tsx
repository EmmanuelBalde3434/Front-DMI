import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from './types';

export type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const emailOk = (s: string) => /\S+@\S+\.\S+/.test(s);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const SESSION_KEY = 'medapp_session_v1';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
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
    await sleep(300);
    if (!emailOk(email) || password.length < 6) {
      setLoading(false);
      throw new Error('Credenciales inválidas');
    }
    const u = { id: 'me', email, name: email.split('@')[0] };
    setUser(u);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    await sleep(400);
    if (!name.trim()) { setLoading(false); throw new Error('Ingresa tu nombre'); }
    if (!emailOk(email)) { setLoading(false); throw new Error('Email inválido'); }
    if (password.length < 6) { setLoading(false); throw new Error('Contraseña muy corta'); }
    const u = { id: String(Date.now()), email, name };
    setUser(u);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
