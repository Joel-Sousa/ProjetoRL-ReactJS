import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Cabecalho from './layout/cabecalho/Cabecalho';
import Inicio from '../app/paginas/inicio/Inicio';
import Login from '../app/paginas/login/Login';
import PaginaInicial from '../app/paginas/paginaInicial/PaginaInicial';
import loginService from './paginas/login/login.service';
import styles from './app.module.css'
import Rodape from './layout/rodape/Rodape';
import CreateUsuario from './paginas/usuario/CreateUsuario';
import ListUsuario from './paginas/usuario/ListUsuario';
import EditUsuario from './paginas/usuario/EditUsuario';

const Routs = () => {

    // const isLogged = loginService.isLogged();

    const [isToken, setIsToken] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        loginService.observable.onToken().subscribe((token: any) => {
            if (token) {
                setIsToken(true);
                //    console.log("isToken:", isToken);
            }
            if (token === null) {
                setIsToken(false);
                //    console.log("isToken:", isToke5n);
               navigate('/');
           }
       });
       loginService.observable.setToken(loginService.getToken())

   }, []);

    const [idRole, setIdRole] = useState(0);

    (async (isToken) => {
        if (isToken) {
            const resp = await loginService.permission();
            setIdRole(resp?.user?.idRole);
        }
    })(isToken)

    return (
        <div id={styles.app}>
            <Cabecalho />
            <div className={styles.main}>
                <div className={styles.conteudo}>
                    <Routes>
                        <Route path='/' element={<Inicio />} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/createUsuario' element={<CreateUsuario />} />
                        {isToken &&
                            <>
                                <Route path='/paginaInicial' element={<PaginaInicial />} />
                                {idRole === 1 &&
                                    <>
                                        <Route path='/listUsuario' element={<ListUsuario />} />
                                        <Route path='/editUsuario/*' element={<EditUsuario />} />
                                    </>
                                }
                            </>
                        }
                    </Routes>
                </div>
                <Rodape />
            </div>
        </div>
    )
}
export default Routs;
