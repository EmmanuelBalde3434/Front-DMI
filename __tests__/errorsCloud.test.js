import { Alert } from 'react-native';

jest.mock('@env', () => ({ apiKeyOpenWeather: 'TEST_KEY' }), { virtual: true });
import { apiFetch } from '../src/services/api';
import { getTehuacanWeather } from '../src/services/openWeatherService';

describe('Manejo de errores en operaciones cloud', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Simulacion de respuesta 500 del backend
  it('apiFetch: muestra Alert y relanza el error cuando la API del back responde !ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Server error' }),
    });

    await expect(apiFetch('/citas')).rejects.toThrow('Error en la API: 500');

    expect(Alert.alert).toHaveBeenCalledTimes(1);
    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Hubo un problema al conectar con el servidor.'
    );
  });

  // Simulacion de respuesta 404 de OpenWeather
  it('OpenWeather: lanza error cuando la API responde !ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ cod: '404', message: 'city not found' }),
    });

    await expect(getTehuacanWeather()).rejects.toThrow('HTTP error! status: 404');

  });
});
