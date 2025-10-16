import * as SecureStore from "expo-secure-store";
import { apiFetch } from "./api";

const keyAccesToken = "accessToken";
const keyRefreshToken = "refreshToken";
const keyAccesUserData = "userData";
const BASE_URL = "/auth";

export async function login(email: string, password: string) {
  return await apiFetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function verifyOtp(userId: string, otpCode: string) {
  return await apiFetch(`${BASE_URL}/verify-otp`, {
    method: "POST",
    body: JSON.stringify({ userId, otpCode }),
  });
}

export async function register(name: string, email: string, password: string) {
  return await apiFetch(`${BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function eraseData(email: string) {
  return await apiFetch(`${BASE_URL}/eraseData`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function logout() {
  await SecureStore.deleteItemAsync(keyAccesToken);
  await SecureStore.deleteItemAsync(keyRefreshToken);
  await SecureStore.deleteItemAsync(keyAccesUserData);
  return true;
}

export async function secureAccesToken(value: string) {
  if (!value) throw new Error("Token inválido");
  await SecureStore.setItemAsync(keyAccesToken, value);
}

export async function secureRefreshToken(value: string) {
  if (!value) throw new Error("Refresh token inválido");
  await SecureStore.setItemAsync(keyRefreshToken, value);
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
