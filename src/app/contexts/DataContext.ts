import {createContext} from 'react';

type DataContextType = {
    state: {
        name?: string;
    };
    setState: (data: {name: string}) => void;
};

export const DataContext = createContext({} as DataContextType);