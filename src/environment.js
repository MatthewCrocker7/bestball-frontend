const environment = process.env.APP_CONFIG ? process.env.APP_CONFIG : {
    env: 'DEV',
    backend_url: 'http://localhost:9010'
};

export default environment;
