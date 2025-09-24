
const LOCAL_IP = '192.168.100.5'; // Para correr la app en expo go deben de cambiarla por su ipv4
const ANDROID_IP = '10.0.2.2';   // Emulador Android

//Depende del entorno en el que lo vayan a correr hacen el cambio 
export const BASE_URL = `http://${LOCAL_IP}:3000/auth`;

export const authServices = {
  auth: {
    login: `${BASE_URL}/login`,
    register: `${BASE_URL}/register`,
  },
};
