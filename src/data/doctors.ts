export type Doctor = {
    id: string;
    name: string;
    speciality: string;
    rating: number;
    hospital: string;
    avatar: string;
    slots: string[];
};


export const doctors: Doctor[] = [
    {
        id: 'd1',
        name: 'Dra. Ana González',
        speciality: 'Cardiología',
        rating: 4.8,
        hospital: 'Hospital Central',
        avatar: 'https://picsum.photos/seed/doc1/200',
        slots: ['09:00', '09:30', '10:00', '12:00', '16:00']
    },
    {
        id: 'd2',
        name: 'Dr. Luis Pérez',
        speciality: 'Dermatología',
        rating: 4.6,
        hospital: 'Clínica Norte',
        avatar: 'https://picsum.photos/seed/doc2/200',
        slots: ['08:30', '11:00', '13:00', '15:30']
    },
    {
        id: 'd3',
        name: 'Dra. Sofía Ríos',
        speciality: 'Pediatría',
        rating: 4.9,
        hospital: 'Hospital Infantil',
        avatar: 'https://picsum.photos/seed/doc3/200',
        slots: ['10:30', '11:30', '14:00', '17:00']
    }
];