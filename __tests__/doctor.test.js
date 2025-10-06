import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const BASE_URL = "https://backenddmi.onrender.com/api/citas";

const doctorEx = {
    id: "1",
    name: "Juan Jiménez",
    speciality: "Cardiólogo",
    rating: 5,
    hospital: "Los Ángeles",
    avatar: "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
    slots: ["09:00", "09:30", "10:00", "12:00", "16:00"],
};

describe("Pruebas de módulo de Médicos", () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    // GET ALL
    it("Debe obtener todos los médicos registrados", async () => {
        mock.onGet(BASE_URL).reply(200, [doctorEx]);

        const response = await axios.get(BASE_URL);

        expect(response.status).toBe(200);
        expect(response.data[0].name).toBe("Juan Jiménez");
    });

    // GET ONE
    it("Debe obtener un médico por ID", async () => {
        const id = "1";
        mock.onGet(`${BASE_URL}/${id}`).reply(200, doctorEx);

        const response = await axios.get(`${BASE_URL}/${id}`);

        expect(response.status).toBe(200);
        expect(response.data.speciality).toBe("Cardiólogo");
    });

    // CREATE
    it("Debe registrar un nuevo médico", async () => {
        const newDoctor = { ...doctorEx, id: "2", name: "María López" };

        mock.onPost(BASE_URL).reply(config => {
            const body = JSON.parse(config.data);
            return [201, { ...body, id: "2" }];
        });

        const response = await axios.post(BASE_URL, newDoctor);

        expect(response.status).toBe(201);
        expect(response.data.name).toBe("María López");
    });

    // UPDATE
    it("Debe actualizar los datos de un médico existente", async () => {
        const id = "1";
        const doctorUpdate = { ...doctorEx, rating: 4 };

        mock.onPut(`${BASE_URL}/${id}`).reply(config => {
            const body = JSON.parse(config.data);
            return [200, body];
        });

        const response = await axios.put(`${BASE_URL}/${id}`, doctorUpdate);

        expect(response.status).toBe(200);
        expect(response.data.rating).toBe(4);
    });

    // DELETE
    it("Debe eliminar un médico", async () => {
        const id = "1";
        mock.onDelete(`${BASE_URL}/${id}`).reply(200, { message: "Médico eliminado" });

        const response = await axios.delete(`${BASE_URL}/${id}`);

        expect(response.status).toBe(200);
        expect(response.data.message).toBe("Médico eliminado");
    });
});
