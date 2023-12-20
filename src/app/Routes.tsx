import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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

    const isLogged = loginService.isLogged();
    
    const [idRole, setIdRole] = useState(0);

    (async (isLogged) => {
        if (isLogged) {
            const resp = await loginService.permission();
            setIdRole(resp?.user?.idRole);
        }
    })(isLogged)
    

    return (
        <div id={styles.app}>
            <Cabecalho />
            <div className={styles.main}>
                <div className={styles.conteudo}>
                    <Routes>
                        <Route path='/' element={<Inicio />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/createUsuario' element={<CreateUsuario />} />
                        {isLogged &&
                            <>
                                <Route path='/paginaInicial' element={<PaginaInicial />} />
                            {idRole == 1 &&
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
