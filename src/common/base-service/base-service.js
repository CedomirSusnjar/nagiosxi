import fetch from 'axios';

const baseUrl = "http://192.168.17.128/nagiosxi/api/v1/";
const baseApikeyURL = "http://localhost:8080/diplomski_Nagios/api/auth/";

const baseConfig = {
    baseURL: baseUrl
}

const baseApikeyConfig = {
    baseURL: baseApikeyURL
}

const createInstance = (config) => {
    const instance = fetch.create(config);
    return instance;
}

const instance = createInstance(baseConfig);
const apikeyInstance = createInstance(baseApikeyConfig);

export const baseService = {
    baseUrl,
    service() {
        return instance;
    }
};

export const apikeyService = {
    baseApikeyURL,
    service() {
        return apikeyInstance
    }
}