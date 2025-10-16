import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";
import { PrivacityAdvirsmentPopUp } from "../../data/privacityAdvirsment";
import { privacityAdvirsment } from "../../data/privacityAdvirsment";
import { ModalAvisoPrivacidad } from "./ModalAvisoPrivacidad";

type PopUpAvisoPrivacidadProps = {
  isVisible: boolean;
  onClose: () => void;
  onAccept: () => void; 
  data: PrivacityAdvirsmentPopUp;
};

export const PopUpAvisoPrivacidad: React.FC<PopUpAvisoPrivacidadProps> = ({
  isVisible,
  onClose,
  data,
  onAccept,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleConfirm = () => {
    if (!isChecked) {
      alert("Debes aceptar el Acuerdo de Privacidad antes de continuar.");
      return;
    }
    onAccept();
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView style={{ maxHeight: "90%" }}>
            <Text style={styles.title}>{data.titulo}</Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Responsable: </Text>
              {data.mensaje}
            </Text>

    
            <View style={styles.checkboxContainer}>
              <Switch value={isChecked} onValueChange={setIsChecked} />
              <Text style={styles.checkboxText}>
                Acepto el{" "}
                <Text
                  style={styles.link}
                  onPress={() => setShowModal(true)} >
                  Acuerdo de Privacidad
                </Text>
              </Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Switch value={isChecked2} onValueChange={setIsChecked2} />
              <Text style={styles.checkboxText}>
               No deseo que mis datos sean compartidos con terceros para fines de lucro </Text>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={handleConfirm} style={styles.button}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal del Aviso de Privacidad */}
      <ModalAvisoPrivacidad
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        data={privacityAdvirsment}
      />
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  checkboxText: {
    fontSize: 15,
    color: "#374151",
    marginLeft: 8,
    flexShrink: 1,
  },
  link: {
    color: "#2e7d6d",
    textDecorationLine: "underline",
    fontWeight: "600",
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
