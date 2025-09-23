import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useAppts } from '../appointments/ApptStore';


export default function Appointments() {
    const { appts, removeAppt } = useAppts();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header title="Mis citas" />
            {appts.length === 0 ? (
                <Text style={{ padding: 16, color: '#6b7280' }}>Aún no tienes citas programadas.</Text>
            ) : (
                <FlatList
                    data={appts}
                    keyExtractor={(it) => it.id}
                    contentContainerStyle={{ padding: 16, gap: 12 }}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: '#f0f9ff', borderRadius: 12, padding: 12 }}>
                            <Text style={{ fontWeight: '800' }}>{item.doctorName}</Text>
                            <Text style={{ color: '#6b7280' }}>{item.speciality} • {item.hospital}</Text>
                            <Text style={{ marginTop: 6 }}>🗓️ {new Date(item.when).toLocaleString()}</Text>
                            <TouchableOpacity onPress={() => removeAppt(item.id)} style={{ marginTop: 10, backgroundColor: '#ef4444', paddingVertical: 10, borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontWeight: '800' }}>Cancelar cita</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}