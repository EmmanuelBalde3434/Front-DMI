import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useAuth } from '../auth/AuthContext';


export default function Profile() {
    const { user, logout } = useAuth();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header title="Perfil" />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                {user ? (
                    <>
                        <Text style={{ fontSize: 20, fontWeight: '800' }}>{user.name || user.email}</Text>
                        <Text style={{ color: '#6b7280' }}>{user.email}</Text>
                        <TouchableOpacity onPress={logout} style={{ backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, marginTop: 8 }}>
                            <Text style={{ color: '#fff', fontWeight: '700' }}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={{ color: '#6b7280' }}>No has iniciado sesión.</Text>
                )}
            </View>
        </View>
    );
}