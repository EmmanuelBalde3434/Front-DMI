import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';


export default function Messages() {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header title="Mensajes" />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#6b7280' }}>Aquí podrías chatear con tu doctor.</Text>
            </View>
        </View>
    );
}