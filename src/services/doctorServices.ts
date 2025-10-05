import { apiFetch } from "./api";

export type Doctor = {
  id: string;
  name: string;
  speciality: string;
  rating: number | null;
  hospital: string;
  avatar?: string;
  slots?: string[];
};

function normalizeDoctor(raw: any): Doctor {
  return {
    id: String(raw.id ?? raw._id ?? Math.random().toString()),
    name: raw.name ?? raw.nombre ?? "Sin nombre",
    speciality: raw.speciality ?? raw.specialty ?? "General",
    rating: raw.rating != null ? Number(raw.rating) : null,
    hospital: raw.hospital ?? raw.clinic ?? "N/D",
    avatar: raw.avatar ?? "https://via.placeholder.com/128",
    slots: Array.isArray(raw.slots) ? raw.slots : [],
  };
}

export const doctorServices = {
  getAll: async () => {
    const json = await apiFetch("/doctor");
    return Array.isArray(json) ? json.map(normalizeDoctor) : [];
  },

  getOne: async (id: string) => {
    const json = await apiFetch(`/doctor/${id}`);
    return normalizeDoctor(json);
  },

  create: async (doctor: Partial<Doctor>) => {
    const json = await apiFetch("/doctor", {
      method: "POST",
      body: JSON.stringify(doctor),
    });
    return normalizeDoctor(json);
  },

  update: async (id: string, doctor: Partial<Doctor>) => {
    const json = await apiFetch(`/doctor/${id}`, {
      method: "PUT",
      body: JSON.stringify(doctor),
    });
    return normalizeDoctor(json);
  },

  delete: async (id: string) => {
    return await apiFetch(`/doctor/${id}`, { method: "DELETE" });
  },
};
