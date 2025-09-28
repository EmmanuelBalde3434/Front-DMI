import * as SecureStore from 'expo-secure-store';

const LOCAL_IP = '192.168.1.101'; // Para correr la app en expo go deben de cambiarla por su ipv4
const ANDROID_IP = '10.0.2.2';   // Emulador Android

  const keyAccesToken = process.env.keyAccesToken;
    const keyAccesUserData = process.env.keyAccesUserData;

//Depende del entorno en el que lo vayan a correr hacen el cambio 
export const BASE_URL = `http://${LOCAL_IP}:3000/auth`;

export const authServices = {
  auth: {
    login: `${BASE_URL}/login`,
    register: `${BASE_URL}/register`,
  },
};

export async function secureAccesToken(value:string) {
      await SecureStore.setItemAsync(keyAccesToken, value);
} 

export async function secureUserData(value: { id: string; email: string; name: string }) {
  try {
    const json = JSON.stringify(value);
    await SecureStore.setItemAsync(keyAccesUserData, json);
  } catch (error) {
    console.error('Error al guardar los datos del usuario en SecureStore:', error);
  }
}


