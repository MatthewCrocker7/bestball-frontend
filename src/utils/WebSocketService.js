import { Client } from '@stomp/stompjs';
import environment from '../environment';

class WebSocketService {
    constructor (socketEndpoint, connectCallback, errorCallback) {
        const client = new Client();
        const url = environment.socket_url + socketEndpoint;

        client.configure({
            brokerURL: url,
            onConnect: connectCallback,
            onStompError: errorCallback
        });
        client.activate();
        this.client = client;
    }

    deactivate = () => {
        this.client.deactivate();
    };

    subscribe = (url, subscriptionCallback) => {
        this.client.subscribe(url, subscriptionCallback);
    };

    publish = (url, data) => {
        this.client.publish({
            destination: url,
            body: JSON.stringify(data)
        });
    };

};

export default WebSocketService;
