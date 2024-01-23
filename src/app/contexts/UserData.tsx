import { useContext, useEffect } from 'react';
import { DataContext } from './DataContext';
import Cookies from 'universal-cookie';

export default function UserData() {
    const cookies = new Cookies();
    const {state, setState} = useContext(DataContext);
    
    useEffect(() => {
        setState({...state, nome: cookies.get('usuario')})
    // },[])
    },[cookies.get('token')])

    return (
        <>
        </>
    )
}