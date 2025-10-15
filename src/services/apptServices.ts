export const BASE_URL = "https://backenddmi-m8fe.onrender.com/appts";

export const apptServices = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al obtener citas");
    return res.json();
  },

  create: async (appt: {
    doctorId: string;
    doctorName: string;
    speciality: string;
    hospital: string;
    when: string;
  }) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appt),
    });
    if (!res.ok) throw new Error("Error al crear cita");
    return res.json();
  },

  remove: async (id: string) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar cita");
    return res.json();
  },
};
