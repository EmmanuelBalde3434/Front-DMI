import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const BASE_URL = "https://backenddmi.onrender.com/api/citas";

const citaEjemplo = {
    id: "1",
    name: "Juan Jiménez",
    speciality: "Cardiólogo",
    rating: 5,
    hospital: "Los Ángeles",
    avatar: "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    slots: ["09:00", "09:30", "10:00", "12:00", "16:00"],
};

describe("Pruebas de módulo de Citas Médicas", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    // GET ALL
    it("Debe obtener todas las citas médicas", async () => {
        mock.onGet(BASE_URL).reply(200, [citaEjemplo]);

        const response = await axios.get(BASE_URL);

        expect(response.status).toBe(200);
        expect(response.data[0].name).toBe("Juan Jiménez");
    });

    // GET ONE
    it("Debe obtener una cita por ID", async () => {
        const id = "1";
        mock.onGet(`${BASE_URL}/${id}`).reply(200, citaEjemplo);

        const response = await axios.get(`${BASE_URL}/${id}`);

        expect(response.status).toBe(200);
        expect(response.data.speciality).toBe("Cardiólogo");
    });

    // CREATE
    it("Debe crear una nueva cita", async () => {
        const nuevaCita = { ...citaEjemplo, id: "2", name: "María López" };

        mock.onPost(BASE_URL).reply(config => {
            const body = JSON.parse(config.data);
            return [201, { ...body, id: "2" }];
        });

        const response = await axios.post(BASE_URL, nuevaCita);

        expect(response.status).toBe(201);
        expect(response.data.name).toBe("María López");
    });

    // UPDATE
    it("Debe actualizar una cita existente", async () => {
        const id = "1";
        const citaActualizada = { ...citaEjemplo, rating: 4 };

        mock.onPut(`${BASE_URL}/${id}`).reply(config => {
            const body = JSON.parse(config.data);
            return [200, body];
        });

        const response = await axios.put(`${BASE_URL}/${id}`, citaActualizada);

        expect(response.status).toBe(200);
        expect(response.data.rating).toBe(4);
    });

    // DELETE
    it("Debe eliminar una cita", async () => {
        const id = "1";
        mock.onDelete(`${BASE_URL}/${id}`).reply(200, { message: "Cita eliminada" });

        const response = await axios.delete(`${BASE_URL}/${id}`);

        expect(response.status).toBe(200);
        expect(response.data.message).toBe("Cita eliminada");
    });
});
