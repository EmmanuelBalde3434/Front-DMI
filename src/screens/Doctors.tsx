import React, { useMemo, useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import Header from '../components/Header';
import DoctorCard from '../components/DoctorCard';
import { doctors as all, type Doctor } from '../data/doctors';
import SlotPickerModal from '../components/SlotPickerModal';

export default function Doctors({ onBook }: { onBook: (doctor: Doctor, slot: string) => void }) {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Doctor | null>(null);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter(
      (d) =>
        d.name.toLowerCase().includes(s) ||
        d.speciality.toLowerCase().includes(s) ||
        d.hospital.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Doctores" />

      <View style={{ padding: 16 }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#e5e7eb',
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
        <Text style={{ marginTop: 8, color: '#6b7280' }}>{list.length} resultados</Text>
      </View>

      <FlatList
        data={list}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        renderItem={({ item }) => <DoctorCard d={item} onBook={(d) => setSelected(d)} />}
      />

      <SlotPickerModal
        visible={!!selected}
        doctor={selected}
        onClose={() => setSelected(null)}
        onPick={(slot) => {
          if (!selected) return;
          onBook(selected, slot);
          setSelected(null);
        }}
      />
    </View>
  );
}
