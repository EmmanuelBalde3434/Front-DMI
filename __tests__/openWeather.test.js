import {getTehuacanWeather} from "../src/services/openWeatherService";

describe("getTehuacanWeather", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("devuelve datos de clima si la API responde bien", async () => {
        const mockData = {
            main: { temp: 20 },
            weather: [{ description: "cielo claro" }],
            name: "Tehuacan",
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );

        const data = await getTehuacanWeather();

        expect(data).toEqual(mockData);

        const calledUrl = global.fetch.mock.calls[0][0];

        expect(decodeURIComponent(calledUrl)).toContain("q=Tehuacan,MX");
    });

    it("lanza error si la API responde con fallo", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({ ok: false, status: 500 })
        );

        await expect(getTehuacanWeather()).rejects.toThrow(
            "HTTP error! status: 500"
        );
    });
});
