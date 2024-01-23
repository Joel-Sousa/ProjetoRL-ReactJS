import React, { ReactNode, createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

type UserType = {
    userData: {
        name: string;
        profile: string;
    };
    setUserData: () => void;
}

interface UserData {
    name: string,
    profile: string,
}

export const UserContext = createContext({} as UserType);

export const ContextUser = ({ children }: { children: ReactNode }) => {
    const [userData, setUser] = useState({} as UserData);

    const cookies = new Cookies();
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

    // console.log("userData:", Object.keys(userData).length !== 0);
    return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>
}