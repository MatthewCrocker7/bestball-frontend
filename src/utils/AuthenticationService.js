import Cookies  from 'universal-cookie';

const cookies = new Cookies();

class AuthenticationService {

    registerSuccessfulLogin = () => {
        console.log('Login successful!');
    };

    registerSuccessfulLogout = () => {
        cookies.remove('auth_token', {
            path: '/'
        });
        console.log('Removed cookie: ', cookies.get('auth_token'));
    };

    isAuthenticated = () => {
        return cookies.get('auth_token');
    };

    buildNewAuthToken = (data) => {
        if(data.email && data.password) {
            const authToken = 'Basic ' + window.btoa(data.email + ':' + data.password);
            const expires = 60 * 60 * 1000;
            const oneHour = new Date(new Date().getTime() + expires);
            cookies.set('auth_token', authToken, {
                path: '/',
                expires: oneHour
            });

            return authToken;
        } else {
            return null;
        }
    };

    getAuthToken = (data) => {
        const authToken = cookies.get("auth_token");
        if(!authToken) {
            return this.buildNewAuthToken(data);
        }

        return authToken;
    };

}

export const authentication = new AuthenticationService();
