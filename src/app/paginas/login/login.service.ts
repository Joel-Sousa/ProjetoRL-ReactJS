import api from '../../../config/api.service';
import Cookies from 'universal-cookie';
import moment from 'moment';
import { Subject } from 'rxjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

class Login {

    protected subject = new Subject();
    protected cookies = new Cookies();

    async login(data: any) {

        const resp = await api.post("login", data)
            .then((resp) => {
                if (resp.data.token) {
                    this.cookies.set('token', JSON.stringify(resp.data.token), { path: '/', expires: moment().add(8, 'hour').toDate() });
                    this.observable.setToken(resp.data.token);
                }
                return resp.data;
            }).catch((err) => err.response.data.message);

        return resp;
    }

    async permission() {
        const resp = await api.get("permission")
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        return resp;
    }

    async logout() {

        const resp = await api.post("logout")
            .then((resp) => resp.data)
            .catch((err) => err.response.data.message);

        this.cookies.remove('token');
        this.observable.clearToken();

        return resp;
    }

    getToken() {
        const token = this.cookies.get('token');
        if (token !== undefined)
            return token;
        return null;
    }

    observable = {
        setToken: (token: any) => this.subject.next(token),
        clearToken: () => this.subject.next(null),
        onToken: () => this.subject.asObservable()
    }

    isLogged() {
        const navigate = useNavigate();
        const [isToken, setIsToken] = useState(false);

        useEffect(() => {
            this.observable.onToken().subscribe((token: any) => {
                if (token) {
                    setIsToken(true);
                } else if (token === null) {
                    setIsToken(false);
                    navigate('/');
                }
            });

            this.observable.setToken(this.getToken())
        }, []);

        return isToken;
    }
}

export default new Login();