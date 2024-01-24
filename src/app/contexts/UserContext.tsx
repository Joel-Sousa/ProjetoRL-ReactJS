import React, { ReactNode, createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import loginService from '../pages/login/login.service';

type UserType = {
    userData: {
        name?: string;
        profile?: string;
    };
    isToken: boolean;
    idRole: number;
    setUserData: () => void;
}

interface UserData {
    name: string,
    profile: string,
}

export const UserContext = createContext({} as UserType);

export const ContextUser = ({ children }: { children: ReactNode }) => {

    const cookies = new Cookies();
    const [userData, setUser] = useState({} as UserData);
    const [isToken, setIsToken] = useState(false);
    const [idRole, setIdRole] = useState(0);

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
            }
        });

        loginService.observable.setToken(loginService.getToken())

    }, []);

    (async (isToken) => {
        if (isToken) {
            const resp = await loginService.permission();
            setIdRole(resp?.user?.idRole);
        }
    })(isToken)

    // console.log("isToken:", isToken);
    // console.log("userData:", Object.keys(userData).length !== 0);
    return <UserContext.Provider value={{ isToken, idRole, userData, setUserData }}>{children}</UserContext.Provider>
}