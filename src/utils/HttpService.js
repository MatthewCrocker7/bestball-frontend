import axios from 'axios';
import environment from '../environment';
import { authentication } from './AuthenticationService';
// import Cookies  from 'universal-cookie';

// const cookies = new Cookies();

class HttpService {
    constructor() {
        // const csrfToken = cookies.get('XSRF-TOKEN');
        const service = axios.create({
            baseURL: environment.backend_url,
            timeout: 60 * 4 * 1000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,GET,PUT',
                'Access-Control-Allow-Headers': '*'
            }
        });
        service.interceptors.response.use(this.onSuccess, this.onError);
        this.service = service;
    }

    onSuccess = (response) => {
        return response;
    };

    onError = (error) => {
        return Promise.reject(error);
    };

    register = (url, data, successCallBack, errorCallBack) => {
        console.log(environment.backend_url + ' ' + url);
        return this.service.request({
            url,
            data,
            method: 'POST',
            responseType: 'json'
        })
            .then((response) => successCallBack(response.data, response.status))
            .catch((error) => errorCallBack(error));
    };

    post = (url, data, successCallBack, errorCallBack) => {
        const authToken = authentication.getAuthToken(data);
        return this.service.request({
            url,
            data,
            method: 'POST',
            responseType: 'json',
            headers: {
                'Authorization': authToken
            }
        })
            .then((response) => successCallBack(response.data, response.status))
            .catch((error) => errorCallBack(error));
    }

}

export default new HttpService();
