import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

//(mock de auth)
const URL = 'http://192.168.100.5:3000/apiEjemplo/protegido';

describe('Acceso a endpoint protegido', () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    //Primera prueba: Acceso con token válido
    it('Permitir el acceso con un token válido', async () => {
        const Token = '123holi456';

        mock.onGet(URL).reply(config => {
            if (config.headers.Authorization === `Bearer ${Token}`) {
                return [200, { user: { name: 'Belen' } }];
            }
            return [401];
        });

        const response = await axios.get(URL, {
            headers: { Authorization: `Bearer ${Token}` }
        });

        expect(response.status).toBe(200);
        expect(response.data.user.name).toBe('Belen');
    });

    //Segunda prueba: Acceso sin token
    it('No permitir el acceso sin token', async () => {
        mock.onGet(URL).reply(401);

        try {
            await axios.get(URL);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });

    //Tercera prueba: Token expirado
    it('Denegar el acceso si el token ha expirado', async () => {
        const expiredToken = 'token_expirado';

        mock.onGet(URL).reply(config => {
            if (config.headers.Authorization === `Bearer ${expiredToken}`) {
                return [401, { message: 'Token expirado' }];
            }
            return [200, { message: 'Acceso permitido' }];
        });

        try {
            await axios.get(URL, { headers: { Authorization: `Bearer ${expiredToken}` } });
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data.message).toBe('Token expirado');
        }
    });

    //Cuarta prueba: Devuelve los datos del usuario
    it('Devolver datos del usuario si está autenticado', async () => {
        const validToken = 'token_valido';

        mock.onGet(URL).reply(config => {
            if (config.headers.Authorization === `Bearer ${validToken}`) {
                return [200, { user: { id: '1', name: 'Beln', email: 'belenzuka@gmail.com' } }];
            }
            return [401];
        });

        const response = await axios.get(URL, { headers: { Authorization: `Bearer ${validToken}` } });

        expect(response.status).toBe(200);
        expect(response.data.user.id).toBe('1');
        expect(response.data.user.email).toBe('belenzuka@gmail.com');
    });
});
