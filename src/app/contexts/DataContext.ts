import {createContext} from 'react';

type DataContextType = {
    state: {
        nome?: string;
    };
    setState: (data: {nome: string}) => void;
};

export const DataContext = createContext({} as DataContextType);