import api from '../../../config/api.service';
import { UsuarioType } from '../../types/types';

class Usuario {

    async createUsuario(data: UsuarioType) {
        const resp = await api.post('createUsuario', data)
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async listUsuario() {
        const resp = await api.get('listUsuario')
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async getUsuarioById(id: number) {
        const resp = await api.get('getUsuarioById', { params: { id } })
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async updateUsuario(data: UsuarioType) {
        const resp = await api.put('updateUsuario', data)
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async deleteUsuarioById(id: number){
        const resp = await api.delete('deleteUsuarioById', {params: {id}})
        .then((resp) => resp.data)
        .catch((err) => err.response.data.message);

    return resp;
    }
}

export default new Usuario();