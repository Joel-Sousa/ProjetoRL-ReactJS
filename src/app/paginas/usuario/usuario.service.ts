import React from 'react';
import api from '../../../config/api.service';

class Usuario {

    async createUsuario(data: any) {
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

    async getUsuarioById(id: any) {
        const resp = await api.get('getUsuarioById', { params: { id } })
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async updateUsuario(data: any) {
        const resp = await api.put('updateUsuario', data)
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async deleteUsuarioById(id: any){
        const resp = await api.delete('deleteUsuarioById', {params: {id}})
        .then((resp) => resp.data)
        .catch((err) => err.response.data.message);

    return resp;
    }
}

export default new Usuario();