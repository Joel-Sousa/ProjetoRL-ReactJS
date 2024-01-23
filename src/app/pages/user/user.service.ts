import Cookies from 'universal-cookie';
import api from '../../../config/api.service';
import { LoginType, UserType } from '../../types/types';
import { Subject } from 'rxjs';
import moment from 'moment';

class User {

    async createUserData(data: UserType) {
        const resp = await api.post('createUserData', data)
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async listUserData() {
        const resp = await api.get('listUserData')
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async getUserDataById(id: number) {
        const resp = await api.get('getUserDataById', { params: { id } })
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async updateUserData(data: UserType) {
        const resp = await api.put('updateUserData', data)
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async deleteUserDataById(id: number){
        const resp = await api.delete('deleteUserDataById', {params: {id}})
        .then((resp) => resp.data)
        .catch((err) => err.response.data.message);

    return resp;
    }
}

export default new User();