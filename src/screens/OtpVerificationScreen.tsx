import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet
} from "react-native";
import { useAuth } from "../auth/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

export default function OtpVerificationScreen() {
    const { verifyOtp } = useAuth();

    type NavigationProp = NativeStackNavigationProp<RootStackParamList, "OtpVerification">;
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();

    const userId = (route.params as { userId: string })?.userId;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    if (!userId) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>
                    Error: falta userId. Regresa e intenta iniciar sesión otra vez.
                </Text>
            </View>
        );
    }

    const onSubmit = async () => {
        if (!otp || otp.length < 6) {
            alert("Ingresa el código de 6 dígitos enviado a tu correo.");
            return;
        }
        setLoading(true);
        const res = await verifyOtp(userId, otp);
        setLoading(false);
        if (res.ok) {
            navigation.reset({
                index: 0,
                routes: [{ name: "MainTabs" }],
            });
        } else {
            alert(res.error || "OTP inválido");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Verifica tu identidad</Text>
                <Text style={styles.subtitle}>
                    Ingresa el código de 6 dígitos que te enviamos por correo.
                </Text>

                <TextInput
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    placeholder="123456"
                    maxLength={6}
                    style={styles.input}
                    placeholderTextColor="#9CA3AF"
                />

                <TouchableOpacity
                    style={[styles.button, loading && { opacity: 0.7 }]}
                    onPress={onSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Verificar código</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 28,
        width: "100%",
        maxWidth: 360,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 24,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 18,
        fontSize: 18,
        textAlign: "center",
        letterSpacing: 4,
        color: "#111827",
        marginBottom: 24,
    },
    button: {
        backgroundColor: "#0EA5E9",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        width: "100%",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    errorText: {
        color: "#B91C1C",
        fontSize: 16,
        textAlign: "center",
    },
});
