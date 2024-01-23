import axios from 'axios';
import userService from '../app/pages/login/login.service';
import {env} from '../env/env';

const configValue: string = (env.baseURL as string);

const api = axios.create({
    baseURL: configValue
});

api.interceptors.request.use(async config => {
    const token = userService.getToken();
    if (token) {
        config.headers = {
            Accept: 'application/json',
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`,
        }

        config.headers['Accept'] = 'application/json';
        config.headers['ContentType'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;


