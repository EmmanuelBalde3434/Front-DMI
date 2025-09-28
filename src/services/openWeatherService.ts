const API_KEY = process.env.apiKeyOpenWeather;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getTehuacanWeather() {
    const queryParams = new URLSearchParams({
        q: 'Tehuacan,MX',
        appid: API_KEY,
        units: 'metric',
        lang: 'es'
    });

    try {
        const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
}