import { Alert } from "react-native";

const API_URL = "https://backenddmi.onrender.com";

export async function apiFetch(path: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en apiFetch:", error);
    Alert.alert("Error", "Hubo un problema al conectar con el servidor.");
    throw error;
  }
}
