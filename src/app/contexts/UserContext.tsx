import React, { ReactNode, createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

type UserType = {
    userData: {
        nome: string;
        perfil: string;
    };
    setUserData: () => void;
}

interface UserData {
    nome: string,
    perfil: string,
}

export const UserContext = createContext({} as UserType);

export const ContextUser = ({ children }: { children: ReactNode }) => {
    const [userData, setUser] = useState({} as UserData);

    const cookies = new Cookies();
    // console.log('cookies.get=user', cookies.get('user'))

    function setUserData() {
        const data = {
            nome: cookies.get('usuario'),
            perfil: cookies.get('perfil'),
        };

        if (cookies.get('token'))
            setUser(data);
    }

    useEffect(() => {
        setUserData();
    }, []);

    // console.log("userData:", Object.keys(userData).length !== 0);
    return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
}