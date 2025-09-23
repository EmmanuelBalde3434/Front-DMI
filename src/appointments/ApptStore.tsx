import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export type Appointment = {
    id: string;
    doctorId: string;
    doctorName: string;
    speciality: string;
    hospital: string;
    when: string;
};


type Ctx = {
    appts: Appointment[];
    addAppt: (a: Appointment) => Promise<void>;
    removeAppt: (id: string) => Promise<void>;
    loading: boolean;
};


const ApptContext = createContext<Ctx | undefined>(undefined);
const KEY = 'medapp_appts_v1';


export function ApptProvider({ children }: { children: React.ReactNode }) {
    const [appts, setAppts] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(KEY);
                setAppts(raw ? JSON.parse(raw) : []);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    const persist = (list: Appointment[]) => AsyncStorage.setItem(KEY, JSON.stringify(list));


    const addAppt = async (a: Appointment) => {
        const next = [a, ...appts];
        setAppts(next);
        await persist(next);
    };


    const removeAppt = async (id: string) => {
        const next = appts.filter((x) => x.id !== id);
        setAppts(next);
        await persist(next);
    };


    const value = useMemo(() => ({ appts, addAppt, removeAppt, loading }), [appts, loading]);
    return <ApptContext.Provider value={value}>{children}</ApptContext.Provider>;
}


export function useAppts() {
    const ctx = useContext(ApptContext);
    if (!ctx) throw new Error('useAppts must be used within ApptProvider');
    return ctx;
}