import Cookies  from 'universal-cookie';

const cookies = new Cookies();

class AuthenticationService {

    registerSuccessfulLogin = (authToken, email) => {
        console.log('Login successful!');

        const expires = 60 * 60 * 1000;
        const oneHour = new Date(new Date().getTime() + expires);
        cookies.set('auth_token', authToken, {
            path: '/',
            expires: oneHour
        });
        cookies.set('email', email, {
            path: '/',
            expires: oneHour
        });
    };

    registerSuccessfulLogout = () => {
        cookies.remove('auth_token', {
            path: '/'
        });
        cookies.remove('email', {
            path: '/'
        });
        console.log('Logout successful!');
    };

    isAuthenticated = () => {
        return cookies.get('auth_token');
    };

    buildNewAuthToken = (data) => {
        if(data.email && data.password) {
            return 'Basic ' + window.btoa(data.email + ':' + data.password);
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
