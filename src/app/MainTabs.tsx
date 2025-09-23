import React, { useState } from 'react';
import { View } from 'react-native';
import BottomBar from '../components/BottomBar';
import Doctors from '../screens/Doctors';
import Appointments from '../screens/Appointments';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile';
import type { TabKey } from '../types/navigation';
import { useAppts } from '../appointments/ApptStore';
import { type Doctor } from '../data/doctors';


export default function MainTabs() {
    const [tab, setTab] = useState<TabKey>('doctors');
    const { addAppt } = useAppts();


    const onBook = (doctor: Doctor, slot: string) => {
        const [hh, mm] = slot.split(':').map(Number);
        const when = new Date();
        when.setHours(hh, mm, 0, 0);
        addAppt({
            id: String(Date.now()),
            doctorId: doctor.id,
            doctorName: doctor.name,
            speciality: doctor.speciality,
            hospital: doctor.hospital,
            when: when.toISOString(),
        });
        setTab('appointments');
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {tab === 'doctors' && <Doctors onBook={onBook} />}
            {tab === 'appointments' && <Appointments />}
            {tab === 'messages' && <Messages />}
            {tab === 'profile' && <Profile />}


            <BottomBar active={tab} setActive={setTab} />
        </View>
    );
}