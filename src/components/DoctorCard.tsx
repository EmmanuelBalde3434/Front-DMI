import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import type { Doctor } from '../data/doctors';


export default function DoctorCard({ d, onBook }: { d: Doctor; onBook: (d: Doctor) => void }) {
    return (
        <View style={{ backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', padding: 14, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 }}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
                <Image source={{ uri: d.avatar }} style={{ width: 64, height: 64, borderRadius: 999 }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '800' }}>{d.name}</Text>
                    <Text style={{ color: '#6b7280' }}>{d.speciality} • {d.hospital}</Text>
                    <Text style={{ marginTop: 4 }}>⭐ {d.rating.toFixed(1)}</Text>
                </View>
                <TouchableOpacity onPress={() => onBook(d)} style={{ backgroundColor: '#0ea5e9', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10 }}>
                    <Text style={{ color: '#fff', fontWeight: '800' }}>Agendar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}