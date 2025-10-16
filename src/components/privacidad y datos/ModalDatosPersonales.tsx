import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { UserData } from "../../screens/Profile";
import { eraseData} from "../../services/authServices";
import { apiFetch } from "../../services/api";

type ModalDatosPersonalesProps = {
  isVisible: boolean;
  onClose: () => void;
  data: UserData | null;
};

export const ModalDatosPersonales: React.FC<ModalDatosPersonalesProps> = ({
  isVisible,
  onClose,
  data,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRequestDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    try{
        await eraseData(data?.email || "");
    }catch(error){
        console.error("Error al solicitar la eliminación de datos:", error);
    }

    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView style={{ maxHeight: "90%" }}>
            <Text style={styles.title}>Datos Personales que hemos recolectado</Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Nombre Completo: </Text>
              {data?.name}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Dirección de Correo Electrónico: </Text>
              {data?.email}
            </Text>
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRequestDelete}>
            <Text style={{ textAlign: "center", marginTop: 10}}>
              Solicitar la eliminación de mi información
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      
      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>¿Eliminar tu información personal?</Text>
            <Text style={styles.confirmText}>
              Esta acción no se puede deshacer. ¿Estás seguro de continuar?
            </Text>
            <Text style={styles.confirmText}>
              Una vez iniciado el proceso perderas el acceso a tu cuenta y a todos los datos asociados.
            </Text>

            <View style={styles.confirmButtons}>
              <TouchableOpacity
                onPress={() => setShowConfirm(false)}
                style={[styles.confirmButton, { backgroundColor: "#9ca3af" }]}
              >
                <Text style={styles.confirmButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmDelete}
                style={[styles.confirmButton, { backgroundColor: "#dc2626" }]}>
                <Text style={styles.confirmButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    marginBottom: 6,
    color: "#374151",
  },
  bold: {
    fontWeight: "700",
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
  confirmBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },
  confirmText: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
    color: "#374151",
  },
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  confirmButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
