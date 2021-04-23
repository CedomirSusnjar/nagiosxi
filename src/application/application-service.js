import api from '../common/base-service/base-service';

export const getAllHosts = async () => {
    return api.service().get('objects/hoststatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1');
};

export const getHostByName = async (hostname) => {
    return api.service().get(`objects/hoststatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1&host_name=${hostname}`);
};

export const getAllHostgroups = async () => {
    return api.service().get(`config/hostgroup?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1`);
};

export const addHost = async obj => {
    return api.service().post('config/host?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1', obj, {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }
)};

export const updateHost = async obj => {
    return api.service().put(`config/host/localhost?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1` + obj);
};

export const removeHost = async host => {
    return api.service().delete(`config/host/${host}?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1&applyconfig=1`);
}

export const getHostServices = async (hostname) => {
    return api.service().get(`objects/servicestatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1&host_name=${hostname}`);
};

export const getServiceByName = async (serviceName, hostname) => {
    return api.service().get(`objects/servicestatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1&host_name=${hostname}&service_description=${serviceName}`);
}

export const addService = async obj => {
    return api.service().post('config/service?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1', obj, {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }
)};

export const removeService = async (service, host) => {
    return api.service().delete(`config/service?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1&host_name=${host}&service_description=${service}&applyconfig=1`);
};

export const getHostgroupHosts = async (hostgroup) => {
    return api.service().get(`config/hostgroup?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1&hostgroup_name=${hostgroup}`);
};

export const login = async (obj) => {
    return api.service().post('authenticate?pretty=1', obj,{
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
};

export const getAllServices = async () => {
    return api.service().get(`objects/servicestatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1`);
};

export const trimServiceStatus = (message) => {
    return message.substring(0, message.indexOf('-')).trim();
}

export const getColorByServiceStatus = (status) => {

    if(status.includes("OK")){
        return "green";
    }
    else if(status.includes("WARNING")){
        return "orange";
    }
    else if(status.includes("CRITICAL") || status.includes("not found")){
        return "red";
    }

    switch(status){
        case "OK":
            return "green";
        case "CRITICAL":
            return "red";
        case "WARNING":
            return "orange";
        default:
            return "green";
    }
}