export type PrivacityAdvirsment = {
  titulo: string;
  empresaResponsable: string;
  proposito: string;
  derechos: string[];
  datosRecolectados: string[];
  contacto: string;
  transferencias: string;
  conservacion: string;
  seguridad: string;
};

export type PrivacityAdvirsmentPopUp = {
  titulo: string;
  mensaje: string;
};

export const privacityAdvirsment: PrivacityAdvirsment = {
  titulo: "Aviso de Privacidad",
  empresaResponsable: "Aplicación de Citas Médicas S.A. de C.V.",
  proposito: "Usamos tus datos únicamente para agendar y gestionar tus citas médicas, mejorar tu experiencia en la aplicación y cumplir con obligaciones legales.",
  derechos: [
    "Acceso, rectificación, portabilidad y supresión de datos",
    "Optar por no compartir o vender tu información personal (CCPA/CPRA)",
    "Retirar tu consentimiento en cualquier momento",
    "Limitar el uso de información sensible"
  ],
  datosRecolectados: [
    "Nombre, correo electrónico y teléfono",
    "Información de salud necesaria para agendar la cita",
    "Historial de citas e interacciones en la app",
    "Ubicación (solo si el usuario lo autoriza)"
  ],
  contacto: "Puedes ejercer tus derechos escribiendo a privacidad@citasmedicas.com o desde la sección 'Privacidad' en la app.",
  transferencias: "Si transferimos datos fuera de la UE/EEE, aplicamos cláusulas contractuales tipo u otras garantías adecuadas.",
  conservacion: "Tus datos se conservarán mientras tengas una cuenta activa o mientras sea necesario para cumplir con obligaciones legales en materia de salud.",
  seguridad: "Aplicamos cifrado, controles de acceso y auditorías para proteger tu información contra accesos no autorizados."
};

export const privacityAdvirsmentPopUp:PrivacityAdvirsmentPopUp = {
    titulo: "Aviso de Privacidad",
    mensaje: "Al crear una cuenta, aceptas nuestro Aviso de Privacidad y Términos de Servicio. Por favor, revísalos cuidadosamente."
}