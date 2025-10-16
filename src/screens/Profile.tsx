import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import Header from '../components/Header';
import { useAuth } from '../auth/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome5, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { ModalAvisoPrivacidad } from '../components/privacidad y datos/ModalAvisoPrivacidad';
import { ModalDatosPersonales } from '../components/privacidad y datos/ModalDatosPersonales';
import { privacityAdvirsment } from '../data/privacityAdvirsment';

export type UserData = {
  id: string;
  email: string;
  name: string;
};

export default function Profile() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [showModalDatosPersonales, setShowModalDatosPersonales] = React.useState(false);

  const keyAccesUserData = "userData";

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

  const menuItems = [
    { icon: <FontAwesome name="user" size={20} color="#2e7d6d" />, label: 'Ver mi Información Personal',abrirModal: ()=>setShowModalDatosPersonales(true)},
    {icon:<FontAwesome5 name="calendar-check" size={20} color="#2e7d6d" />, label: 'Aviso de Privacidad', abrirModal: ()=>setShowModal(true)},

  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <Header title="Perfil" />

      <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
        {user ? (
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              maxWidth: 380,
              borderRadius: 20,
              paddingVertical: 30,
              paddingHorizontal: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 3,
            }}>
          

            <Text style={{ fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 4 }}>
              {userData?.name}
            </Text>
            <Text style={{ color: '#6b7280', fontSize: 16, marginBottom: 24 }}>
              {userData?.email}
            </Text>

            <View style={{ width: '100%', marginBottom: 20 }}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={item.abrirModal}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: index < menuItems.length - 1 ? 0.5 : 0,
                    borderColor: '#e5e7eb',
                  }}>
                  <View style={{ width: 30, alignItems: 'center' }}>{item.icon}</View>
                  <Text style={{ fontSize: 16, color: '#374151', marginLeft: 8 }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <ModalAvisoPrivacidad isVisible={showModal} onClose={()=>setShowModal(false)} data={privacityAdvirsment}></ModalAvisoPrivacidad>
            <ModalDatosPersonales isVisible={showModalDatosPersonales} onClose={()=>setShowModalDatosPersonales(false)} data={userData}></ModalDatosPersonales>
            

            <TouchableOpacity
              onPress={logout}
              style={{
                backgroundColor: 'blue',
                paddingHorizontal: 24,
                paddingVertical: 14,
                borderRadius: 14,
                width: '100%',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{ color: '#6b7280', fontSize: 16 }}>No has iniciado sesión.</Text>
        )}
      </View>
    </View>
  );
}
