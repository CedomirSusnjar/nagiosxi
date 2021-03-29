import fetch from 'axios';

const baseUrl = "http://192.168.17.128/nagiosxi/api/v1/";

const baseConfig = {
    baseURL: baseUrl
}

const createInstance = (config) => {
    const instance = fetch.create(config);
    return instance;
}

const instance = createInstance(baseConfig);

const baseService = {
    baseUrl,
    service() {
        return instance;
    }
}

export default baseService;