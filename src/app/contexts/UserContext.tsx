import React, { ReactNode, createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import loginService from '../pages/login/login.service';
import { useNavigate } from 'react-router-dom';

type UserType = {
    userData: {
        name?: string;
        profile?: string;
    };
    isToken: boolean;
    roles_id: number;
    setUserData: () => void;
}

interface UserData {
    name: string,
    profile: string,
}

export const UserContext = createContext({} as UserType);

export const ContextUser = ({ children }: { children: ReactNode }) => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const [userData, setUser] = useState({} as UserData);
    const [isToken, setIsToken] = useState(false);
    const [roles_id, setRoles_id] = useState(0);

    // console.log('cookies.get=user', cookies.get('user'))

    function setUserData() {
        const data = {
            name: cookies.get('name'),
            profile: cookies.get('profile'),
        };

        if (cookies.get('token'))
            setUser(data);
    }

    useEffect(() => {
        setUserData();
    }, []);

    useEffect(() => {
        loginService.observable.onToken().subscribe((token: any) => {
            if (token) {
                setIsToken(true);
            }else if (token === null) {
                setIsToken(false);
                navigate('/')
            }
        });

        loginService.observable.setToken(loginService.getToken())

    }, []);

    (async (isToken) => {
        if (isToken) {
            const resp = await loginService.permission();
            setRoles_id(resp.roles_id);
        }
    })(isToken)

    // console.log("userData:", Object.keys(userData).length !== 0);
    return <UserContext.Provider value={{ isToken, roles_id, userData, setUserData }}>{children}</UserContext.Provider>
}