import React from 'react';
import { Modal, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { Doctor } from '../data/doctors';
import CardClima from './CardClima';

export default function SlotPickerModal({
  visible,
  doctor,
  onClose,
  onPick,
}: {
  visible: boolean;
  doctor: Doctor | null;
  onClose: () => void;
  onPick: (slot: string) => void;
}) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        
        <CardClima />

        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#e5e7eb'
        }}>
          <Text style={{ fontSize: 18, fontWeight: '800' }}>
            {doctor ? doctor.name : 'Selecciona horario'}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        </View>

        {doctor ? (
          <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
            <Text style={{ color: '#6b7280', marginBottom: 8 }}>
              {doctor.speciality} • {doctor.hospital}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {doctor.slots.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => onPick(s)}
                  style={{
                    backgroundColor: '#e0f2fe',
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 999
                  }}>
                  <Text style={{ color: '#0c4a6e', fontWeight: '700' }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={{
              marginHorizontal: 16,
              marginBottom: 8,
              color: '#dc2626',
              fontWeight: 'bold',
              fontSize: 14,
              backgroundColor: '#fee2e2',
              padding: 8,
              borderRadius: 8,
              textAlign: 'center',
              marginTop: 60
              
            }}>
              ⚠️ Toma en cuenta el clima para evitar retrasos en tu cita.
            </Text>
          </ScrollView>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Elige un doctor para ver horarios</Text>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}
