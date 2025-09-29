# 📱 Frontend - Aplicación Móvil con Expo y Consumo de API

## 🚀 Instrucciones de instalación y ejecución

### 1️ Clonar el repositorio
```bash
git clone https://github.com/EmmanuelBalde3434/Front-DMI.git
cd Front-DMI
```
### 2️ Instalar dependencias
```bash
npm install
```
### 3️ Configurar variables de entorno
```bash
Crea el archivo .env en la raíz del proyecto:

API_URL=http://localhost:3001/api
```

> ⚠️ Importante: Reemplaza IPV4_DEL_BACKEND por la IP del dispositivo donde se ejecute el backend.

### 4️ Configurar la IP manualmente

En el archivo:

>/src/Services/AuthServices.js


modifica la línea donde se define la URL base:
```bash
const BASE_URL = "http://<IPV4_DEL_BACKEND>:3000/api";
```
### ▶ Ejecutar la aplicación móvil

Ejecuta:
```bash
npm start
```

Luego escanea el QR generado por Expo desde la app Expo Go en tu dispositivo móvil.
La aplicación se abrirá automáticamente y mostrará la interfaz principal.
```bash
📦 Dependencias principales

expo — framework de desarrollo móvil.

react-native — entorno base para aplicaciones móviles.

axios — consumo de API.

react-navigation — manejo de navegación entre pantallas.

dotenv — manejo de variables de entorno.

@expo/vector-icons — íconos visuales.
```
🌐 Integración con la API

Ejemplo de autenticación desde el frontend:

import axios from "axios";

const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return response.data;
};

🔒 Documentación de seguridad

Consulta el archivo SECURITY.md
 para conocer los principios y medidas de seguridad aplicadas en la app.

👥 Autores

Equipo de desarrollo:
```bash
Johan Emmanuel Balderas Alfonso
Jesús Enrique Carmona Lezama
Mariana Herrera Aburto
Yessenia Cristal Vázquez García
Héctor Miguel Ortega Rodríguez 
Kevin Diego Cruz
```
Proyecto de Seguridad y Consumo de Servicios en la Nube
Universidad Tecnológica de Tehuacán


---