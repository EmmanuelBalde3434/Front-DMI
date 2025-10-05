import { getTehuacanWeather } from "./openWeatherService";

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

    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }) as any
    );

    const data = await getTehuacanWeather();

    expect(data).toEqual(mockData);

    const calledUrl = (globalThis.fetch as jest.Mock).mock.calls[0][0];

    expect(decodeURIComponent(calledUrl)).toContain("q=Tehuacan,MX");
  });

  it("lanza error si la API responde con fallo", async () => {
    (globalThis.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({ ok: false, status: 500 }) as any
    );

    await expect(getTehuacanWeather()).rejects.toThrow(
      "HTTP error! status: 500"
    );
  });
});


