import * as SecureStore from "expo-secure-store";
import { apiFetch } from "./api";

const keyAccesToken = "accessToken";
const keyAccesUserData = "userData";
const BASE_URL = "/auth";

export async function login(email: string, password: string) {
  return await apiFetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(name: string, email: string, password: string) {
  return await apiFetch(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function logout() {
  await SecureStore.deleteItemAsync(keyAccesToken);
  await SecureStore.deleteItemAsync(keyAccesUserData);
  return true;
}

export async function secureAccesToken(value: string) {
  if (!value) throw new Error("Token inválido");
  await SecureStore.setItemAsync(keyAccesToken, value);
}

export async function secureUserData(value: { id: string; email: string; name: string }) {
  await SecureStore.setItemAsync(keyAccesUserData, JSON.stringify(value));
}

export async function getStoredToken() {
  return await SecureStore.getItemAsync(keyAccesToken);
}

export async function getStoredUser() {
  const raw = await SecureStore.getItemAsync(keyAccesUserData);
  return raw ? JSON.parse(raw) : null;
}
