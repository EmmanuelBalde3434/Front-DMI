import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

//(mock de auth)
const URL_AUTH = 'http://192.168.100.5:3000/apiEx/auth';
const URL_REGISTER = 'http://192.168.100.5:3000/apiEx/register';

describe('Pruebas de autenticación y registro', () => {
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

        mock.onGet(URL_AUTH).reply(config => {
            if (config.headers.Authorization === `Bearer ${Token}`) {
                return [200, { user: { name: 'Belen' } }];
            }
            return [401];
        });

        const response = await axios.get(URL_AUTH, {
            headers: { Authorization: `Bearer ${Token}` }
        });

        expect(response.status).toBe(200);
        expect(response.data.user.name).toBe('Belen');
    });

    //Segunda prueba: Acceso sin token
    it('No permitir el acceso sin token', async () => {
        mock.onGet(URL_AUTH).reply(401);

        try {
            await axios.get(URL_AUTH);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });

    //Tercera prueba: Token expirado
    it('Denegar el acceso si el token ha expirado', async () => {
        const expiredToken = 'token_expirado';

        mock.onGet(URL_AUTH).reply(config => {
            if (config.headers.Authorization === `Bearer ${expiredToken}`) {
                return [401, { message: 'Token expirado' }];
            }
            return [200, { message: 'Acceso permitido' }];
        });

        try {
            await axios.get(URL_AUTH, { headers: { Authorization: `Bearer ${expiredToken}` } });
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data.message).toBe('Token expirado');
        }
    });

    //Cuarta prueba: Devuelve los datos del usuario está autenticado
    it('Devolver datos del usuario si está autenticado', async () => {
        const validToken = 'token_valido';

        mock.onGet(URL_AUTH).reply(config => {
            if (config.headers.Authorization === `Bearer ${validToken}`) {
                return [200, { user: { id: '1', name: 'Belen', email: 'belenzuka@gmail.com' } }];
            }
            return [401];
        });

        const response = await axios.get(URL_AUTH, { headers: { Authorization: `Bearer ${validToken}` } });

        expect(response.status).toBe(200);
        expect(response.data.user.id).toBe('1');
        expect(response.data.user.email).toBe('belenzuka@gmail.com');
    });

    //Quinta prueba: Registrar usuario
    it('Registrar un nuevo usuario correctamente', async () => {
        const newUser = { name: 'Belen', email: 'belenzuka@gmail.com', password: '123456' };

        mock.onPost(URL_REGISTER).reply(config => {
            const body = JSON.parse(config.data);
            if (body.email === 'belenzuka@gmail.com') {
                return [200, {
                    user: { id: '10', name: body.name, email: body.email },
                    accessToken: 'token_nuevo_usuario'
                }];
            }
            return [400, { message: 'Datos inválidos' }];
        });

        const response = await axios.post(URL_REGISTER, newUser);

        expect(response.status).toBe(200);
        expect(response.data.user.name).toBe('Belen');
        expect(response.data.accessToken).toBe('token_nuevo_usuario');
    });

    //Sexta prueba: Email en uso
     it('No registrar si el email ya está en uso', async () => {
        const newUser = { name: 'Belen', email: 'belenzuka@gmail.com', password: 'abc123' };

        mock.onPost(URL_REGISTER).reply(config => {
            const body = JSON.parse(config.data);
            if (body.email === 'belenzuka@gmail.com') {
                return [409, { message: 'El correo ya está registrado' }];
            }
            return [200];
        });

        try {
            await axios.post(URL_REGISTER, newUser);
        } catch (error) {
            expect(error.response.status).toBe(409);
            expect(error.response.data.message).toBe('El correo ya está registrado');
        }
    });
});
