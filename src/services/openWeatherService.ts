const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getTehuacanWeather() {
    const queryParams = new URLSearchParams({
        q: "Tehuacan,MX",
        appid: process.env.apiKeyOpenWeather,
        units: "metric",
        lang: "es",
    });

    try {
        const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
}
