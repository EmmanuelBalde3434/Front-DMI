import React, { useMemo, useState, useEffect } from "react";
import { View, TextInput, FlatList, Text, ActivityIndicator, Alert } from "react-native";
import Header from "../components/Header";
import DoctorCard from "../components/DoctorCard";
import SlotPickerModal from "../components/SlotPickerModal";
import { doctorServices, Doctor } from "../services/doctorServices";

export default function Doctors({onDelete}: {
onDelete: (id: string) => Promise<void>;
}) {
    const [q, setQ] = useState("");
    const [selected, setSelected] = useState<Doctor | null>(null);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await doctorServices.getAll();
                setDoctors(res);
            } catch (error) {
                console.error("Error cargando doctores:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const list = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return doctors;
        return doctors.filter(
            (d) =>
                d.name.toLowerCase().includes(s) ||
                d.speciality.toLowerCase().includes(s) ||
                d.hospital.toLowerCase().includes(s)
        );
    }, [q, doctors]);

    const handleDeleteDoctor = (id: string, name?: string) => {
        Alert.alert(
            "Confirmar eliminación",
            `¿Estás seguro de eliminar al doctor ${name || ""}?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sí, eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await onDelete(id);
                            setDoctors((prev) => prev.filter((doc) => doc.id !== id));
                            Alert.alert("Éxito", "El doctor fue eliminado correctamente.");
                        } catch (error) {
                            console.error("Error eliminando doctor:", error);
                            Alert.alert("Error", "No se pudo eliminar el doctor.");
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <Header title="Doctores" />

            <View style={{ padding: 16 }}>
                <View
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: "#e5e7eb",
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                    }}
                >
                    <TextInput
                        placeholder="Buscar por nombre, especialidad o hospital"
                        value={q}
                        onChangeText={setQ}
                        style={{ fontSize: 14 }}
                    />
                </View>
                <Text style={{ marginTop: 8, color: "#6b7280" }}>
                    {loading ? "Cargando..." : `${list.length} resultados`}
                </Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={list}
                    keyExtractor={(it) => it.id}
                    contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
                    renderItem={({ item }) => (
                        <DoctorCard
                            d={item}
                            onBook={(d) => setSelected(d)}
                            onDelete={() => handleDeleteDoctor(item.id, item.name)}
                        />
                    )}
                    ListEmptyComponent={
                        <Text style={{ textAlign: "center", marginTop: 20 }}>
                            No se encontraron doctores
                        </Text>
                    }
                />
            )}

            {selected && (
                <SlotPickerModal
                    visible={true}
                    doctor={selected}
                    onClose={() => setSelected(null)}
                    onPick={(slot) => {
                        const d = selected as Doctor;
                        setSelected(null);
                    }}
                />
            )}
        </View>
    );
}
