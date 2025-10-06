import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import type { Doctor } from "../services/doctorServices";

type DoctorCardProps = {
    d: Doctor;
    onBook: (d: Doctor) => void;
    onDelete: (id: string) => void;
};

export default function DoctorCard({ d, onBook, onDelete }: DoctorCardProps) {
    const ratingText =
        typeof d.rating === "number"
            ? d.rating.toFixed(1)
            : d.rating != null
                ? Number(d.rating).toFixed(1)
                : "N/A";

    return (
        <View
            style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                padding: 14,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 3,
            }}
        >
            <View style={{ flexDirection: "row", gap: 12 }}>
                <Image
                    source={{ uri: d.avatar || "https://via.placeholder.com/128" }}
                    style={{ width: 64, height: 64, borderRadius: 999 }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "800" }}>{d.name}</Text>
                    <Text style={{ color: "#6b7280" }}>
                        {d.speciality} • {d.hospital}
                    </Text>
                    <Text style={{ marginTop: 4 }}>⭐ {ratingText}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => onDelete(d.id)}
                    style={{
                        backgroundColor: "red",
                        paddingVertical: 10,
                        paddingHorizontal: 12,
                        borderRadius: 10,
                        height:40
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "800" }}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
