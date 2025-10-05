import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';
import { useAuth } from '../auth/AuthContext';
import * as SecureStore from 'expo-secure-store';

export type UserData = {
  id: string;
  email: string;
  name: string;
};

export default function Profile() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = React.useState<UserData | null>(null);

  const keyAccesToken = "accessToken";
  const keyAccesUserData = "userData";

  async function showStoredToken() {
    try {
      const result = await SecureStore.getItemAsync(keyAccesToken);
      if (result) {
        Alert.alert('🔐 Token almacenado', result);
      } else {
        Alert.alert('Sin datos', 'No hay valores almacenados bajo esa clave.');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo acceder al token.');
    }
  }

  useEffect(() => {
    async function showUserData() {
      try {
        const result = await SecureStore.getItemAsync(keyAccesUserData);
        if (result) {
          const parsed = JSON.parse(result);
          setUserData(parsed);
        } else {
          Alert.alert('Sin datos', 'No hay valores almacenados bajo esa clave.');
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo acceder a los datos de usuario.');
      }
    }

    showUserData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Perfil" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        {user ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '800' }}>{userData?.name}</Text>
            <Text style={{ color: '#6b7280' }}>{userData?.email}</Text>

            <TouchableOpacity
              onPress={logout}
              style={{
                backgroundColor: '#111827',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                marginTop: 8,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>Cerrar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={showStoredToken}
              style={{
                backgroundColor: '#374151',
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                marginTop: 8,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>Ver token almacenado</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{ color: '#6b7280' }}>No has iniciado sesión.</Text>
        )}
      </View>
    </View>
  );
}
