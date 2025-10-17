import React from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { PrivacityAdvirsment } from "../../data/privacityAdvirsment";

type ModalAvisoPrivacidadProps = {
  isVisible: boolean;
  onClose: () => void;
  data: PrivacityAdvirsment;
};

export const ModalAvisoPrivacidad: React.FC<ModalAvisoPrivacidadProps> = ({
  isVisible,
  onClose,
  data,
}) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView style={{ maxHeight: "90%" }}>
            <Text style={styles.title}>{data.titulo}</Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Responsable: </Text>
              {data.empresaResponsable}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Propósito: </Text>
              {data.proposito}
            </Text>

            <Text style={[styles.bold, styles.section]}>Datos que recolectamos:</Text>
            {data.datosRecolectados.map((dato, idx) => (
              <Text key={idx} style={styles.listItem}>• {dato}</Text>
            ))}

            <Text style={[styles.bold, styles.section]}>Derechos de los usuarios:</Text>
            {data.derechos.map((derecho, idx) => (
              <Text key={idx} style={styles.listItem}>• {derecho}</Text>
            ))}

            <Text style={styles.text}>
              <Text style={styles.bold}>Transferencias internacionales: </Text>
              {data.transferencias}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Conservación de datos: </Text>
              {data.conservacion}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Seguridad: </Text>
              {data.seguridad}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Contacto: </Text>
              {data.contacto}
            </Text>
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxHeight: "90%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111827",
  },
  text: {
    fontSize: 15,
    marginBottom: 6,
    color: "#374151",
  },
  bold: {
    fontWeight: "700",
  },
  section: {
    marginTop: 12,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 15,
    color: "#374151",
    marginLeft: 10,
    marginBottom: 3,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#2e7d6d",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
