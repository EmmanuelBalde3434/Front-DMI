# Documento técnico amenzas y riesgos

---
## 1. Modelo de amenazas
### 1.1 Riesgos y amenazas (STRIDE)

Amenaza | Riesgo potencial | Activos afectados | Controles actuales | Controles recomendados |
|------|---------|-----------------|-----------------|------------------|----------------------|
Suplantación de identidad mediante credenciales robadas | Acceso no autorizado a la cuenta del usuario | Credenciales de usuario, sesión | Autenticación con email y contraseña, JWT | OTP de 6 dígitos enviado por correo; expiración corta de OTP |
 Alteración de tokens o datos de usuario | Manipulación de sesiones, elevación de privilegios | JWT, refresh tokens, datos del usuario | JWT firmado, refresh tokens almacenados en DB | Revocación de refresh tokens antiguos; almacenamiento seguro de tokens |
Usuario niega haber realizado acciones | Dificultad para auditoría y seguimiento | Intentos de login, OTP, cambios de sesión | Logging básico de errores | Logging de intentos fallidos y almacenamiento |
Exposición de credenciales, tokens o OTP | Robo de información sensible, acceso indebido | Passwords, tokens, OTP | Passwords hashados (bcrypt), JWT con expiración | OTP de corta duración; tokens revocables; SecureStore/Keychain |
Saturación de recursos mediante múltiples intentos | Bloqueo de usuarios legítimos, sobrecarga del servidor | Servidor, base de datos | Limitación básica de requests | Implementación de rate limiting por usuario para login/OTP |
Uso indebido de refresh token o JWT manipulado | Acceso a endpoints no autorizados | JWT, refresh tokens | Expiración de JWT y refresh tokens | Revocación de refresh tokens al generar nuevos; verificación de token en cada endpoint |

### 1.2 Actores principales
- **Paciente:** Acceso a sus citas y datos personales.  
- **Doctor:** Gestión de citas y expedientes de pacientes asignados.  
- **Administrador:** Control completo de usuarios y doctores.  
- **Servicios externo:** Envío seguro de correos OTP.  
- **Atacante externo:** Sin acceso legítimo, busca explotar vulnerabilidades.
---
### 1.3 Activos críticos
- Credenciales de usuario y OTP.
- Tokens JWT y Refresh Tokens.
- Base de datos MySQL.
- Servidor API Express.
- App móvil React Native.
- Infraestructura en la nube (Render/Vercel).

---
### 1.4 Buenas prácticas implementadas

| Práctica recomendada | Implementación en el sistema |
|---------------------|----------------------------|
| Cifrado de contraseñas | bcrypt con salt |
| Cifrado en tránsito | HTTPS / TLS 1.3 entre frontend y backend |
| Cifrado en almacenamiento | SecureStore / Keychain para tokens en dispositivos móviles |
| Tokens seguros | JWT firmados y refresh tokens revocables |
| Autenticación reforzada | OTP de 6 dígitos con expiración corta |
| Control de sesiones | Expiración automática y validación continua del token |
| Prevención de ataques DoS | Rate limiting por usuario |
| Auditoría y trazabilidad | Logging de intentos fallidos y cambios de sesión |

---

## 2. Arquitectura de CI/CD y DevOps aplicada
La arquitectura DevOps implementada para el sistema se basa en un flujo CI/CD optimizado con las mejores prácticas de 2025, garantizando una entrega más ágil, segura y trazable entre los entornos de desarrollo, prueba y producción.

### **Flujo general del pipeline**

1.  **Repositorio Git**
    
    -   El código fuente del frontend y backend se versiona por separado para mantener independencia modular.
        
    -   Se aplican revisiones obligatorias antes del merge a main.
        
2.  **Integración Continua (CI)**
    
    -   Al detectar un _push_ o _pull request_, se ejecutan pruebas automatizadas con **Jest** .
        
    -   Se validan dependencias, linters y análisis estático de seguridad.
        
    -   Se genera automáticamente un _build_ validado mediante _checks_ de calidad y cobertura.
        
3.  **Entrega Continua (CD)**
    
    -   Los artefactos del backend (Node.js) se empaquetan y despliegan usando **Render**.
        
    -   La publicación se realiza mediante un pipeline con etapas controladas:
        
        -   `build → test → staging → deploy-production`.
            
    -   Las credenciales sensibles se gestionan mediante **variables de entorno seguras (.env y Render Secrets)**, evitando exposición en el repositorio.
        
4.  **Automatización y rollback**
    -   Cada despliegue genera una versión trazable y reversible mediante snapshots en Render.
        
    -   En caso de error en producción, el sistema ejecuta un **rollback automático** a la versión anterior estable.
        

---
