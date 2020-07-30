import axios from 'axios';
import environment from '../environment';

class HttpService {
    constructor() {
        const service = axios.create({
            baseURL: environment.backend_url,
            timeout: 60 * 4 * 1000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
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

    post = (url, data, successCallBack, errorCallBack) => {
        console.log('Base url: ', this.service.baseURL);
        console.log('API url: ', url);
        return this.service.request({
            url,
            data,
            method: 'POST',
            responseType: 'json'
        })
            .then((response) => successCallBack(response.data, response.status))
            .catch((error) => errorCallBack(error));
    }

}

export default new HttpService();
