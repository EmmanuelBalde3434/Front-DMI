import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const KEY = "medapp_appts_v1";

const BASE_URL = "https://backenddmi-m8fe.onrender.com/appointments";

export function ApptProvider({ children }: { children: React.ReactNode }) {
    const [appts, setAppts] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(BASE_URL);
                if (!res.ok) throw new Error("Error al cargar del backend");
                const data = await res.json();
                setAppts(data);
                await AsyncStorage.setItem(KEY, JSON.stringify(data));
            } catch (err) {
                console.warn("No se pudo conectar al backend, usando cache local");
                const raw = await AsyncStorage.getItem(KEY);
                setAppts(raw ? JSON.parse(raw) : []);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const persist = (list: Appointment[]) =>
        AsyncStorage.setItem(KEY, JSON.stringify(list));

    const addAppt = async (a: Appointment) => {
        try {
            const res = await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(a),
            });
            if (!res.ok) throw new Error("Error al crear cita");
            const created = await res.json();

            const next = [created, ...appts];
            setAppts(next);
            await persist(next);
        } catch (err) {
            console.error("Error agregando cita:", err);
        }
    };

    const removeAppt = async (id: string) => {
        try {
            await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
            const next = appts.filter((x) => x.id !== id);
            setAppts(next);
            await persist(next);
        } catch (err) {
            console.error("Error eliminando cita:", err);
        }
    };

    const value = useMemo(
        () => ({ appts, addAppt, removeAppt, loading }),
        [appts, loading]
    );

    return (
        <ApptContext.Provider value={value}>{children}</ApptContext.Provider>
    );
}

export function useAppts() {
    const ctx = useContext(ApptContext);
    if (!ctx) throw new Error("useAppts must be used within ApptProvider");
    return ctx;
}
