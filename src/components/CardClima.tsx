import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getTehuacanWeather } from '../services/openWeatherService';

export default function CardClima() {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await getTehuacanWeather();
                setWeather(data);
            } catch (error) {
                console.error('Error loading weather data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    const getWeatherEmoji = (main: string) => {
        switch (main.toLowerCase()) {
            case 'clear': return '☀️';
            case 'clouds': return '☁️';
            case 'rain': return '🌧️';
            case 'drizzle': return '🌦️';
            case 'thunderstorm': return '⛈️';
            case 'snow': return '❄️';
            case 'mist':
            case 'fog':
            case 'haze': return '🌫️';
            default: return '🌡️';
        }
    };

    const getWeatherAdvice = (main: string) => {
        switch (main.toLowerCase()) {
            case 'clear': return 'Día soleado, ideal para salir. ¡No olvides el protector solar!';
            case 'clouds': return 'Cielo nublado, lleva algo ligero por si refresca.';
            case 'rain': return 'Lluvia en camino, lleva paraguas para evitar contratiempos.';
            case 'drizzle': return 'Llovizna ligera, una chamarra impermeable puede ser útil.';
            case 'thunderstorm': return 'Tormenta eléctrica, mejor evitar estar al aire libre.';
            case 'snow': return 'Nieve presente, abrígate bien y ten precaución al caminar.';
            case 'mist':
            case 'fog':
            case 'haze': return 'Visibilidad reducida, maneja con cuidado si sales.';
            default: return 'Consulta el clima antes de salir para evitar sorpresas.';
        }
    };

    if (loading) {
        return (
            <View style={{ margin: 16, alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0ea5e9" />
                <Text style={{ marginTop: 8, color: '#6b7280' }}>Cargando clima…</Text>
            </View>
        );
    }

    if (!weather || !weather.weather || !weather.main || !weather.wind) {
        return (
            <View style={{ margin: 16 }}>
                <Text style={{ color: '#ef4444' }}>No se pudo cargar el clima.</Text>
            </View>
        );
    }

    const mainCondition = weather.weather[0].main;
    const emoji = getWeatherEmoji(mainCondition);
    const advice = getWeatherAdvice(mainCondition);

    return (
        <View style={{
            backgroundColor: '#e0f2fe',
            margin: 16,
            padding: 16,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2
        }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{emoji} Clima en Tehuacán</Text>
            <Text style={{ marginTop: 4, fontSize: 16, textTransform: 'uppercase', color: '#1e3a8a', fontWeight:'bold' }}>
                {weather.weather[0].description}
            </Text>
            <Text style={{ marginTop: 4 }}>🌡️ Temp: {weather.main.temp}°C</Text>
            <Text>🌬️ Viento: {weather.wind.speed} m/s</Text>
            <Text style={{
                marginTop: 12,
                fontWeight: 'bold',
                fontSize: 15,
                padding: 8,
                borderRadius: 8,
                textAlign: 'center',
            }}>
            {advice}
            </Text>
        </View>
    );
}