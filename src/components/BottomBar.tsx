import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { TabKey } from '../types/navigation';


export default function BottomBar({
    active,
    setActive,
}: {
    active: TabKey;
    setActive: React.Dispatch<React.SetStateAction<TabKey>>;
}) {
    const Tab = ({ id, label, emoji }: { id: TabKey; label: string; emoji: string }) => (
        <TouchableOpacity
            onPress={() => setActive(id)}
            style={{ flex: 1, alignItems: 'center', paddingVertical: 10, backgroundColor: active === id ? '#e0f2fe' : '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb' }}
        >
            <Text style={{ fontSize: 16 }}>{emoji}</Text>
            <Text style={{ fontSize: 12, color: '#374151', marginTop: 2 }}>{label}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
            <Tab id="doctors" label="Doctores" emoji="🩺" />
            <Tab id="appointments" label="Mis citas" emoji="📅" />
            <Tab id="messages" label="Mensajes" emoji="💬" />
            <Tab id="profile" label="Perfil" emoji="👤" />
        </View>
    );
}