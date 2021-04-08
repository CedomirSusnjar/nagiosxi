import api from '../common/base-service/base-service';

export const getAllHosts = async () => {
    return api.service().get('objects/hoststatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1');
};

export const addHost = async obj => {
    return api.service().post('config/host?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1', obj, {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }
)};

export const removeHost = async host => {
    return api.service().delete(`config/host/${host}?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1&applyconfig=1`);
}

export const getHostServices = async (hostname) => {
    return api.service().get(`objects/servicestatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1&host_name=${hostname}`)
};