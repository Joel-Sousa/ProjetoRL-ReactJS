import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './layout/header/Header';
import Home from '../app/pages/home/Home';
import Login from '../app/pages/login/Login';
import HomePage from '../app/pages/homePage/HomePage';
import loginService from './pages/login/login.service';
import styles from './app.module.css'
import Footer from './layout/footer/Footer';
import CreateUser from './pages/user/CreateUser';
import ListUser from './pages/user/ListUser';
import EditUser from './pages/user/EditUser';

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
            <Header />
            <div className={styles.main}>
                <div className={styles.conteudo}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/createUser' element={<CreateUser />} />
                        {isToken &&
                            <>
                                <Route path='/homePage' element={<HomePage />} />
                                {idRole === 1 &&
                                    <>
                                        <Route path='/listUser' element={<ListUser />} />
                                        <Route path='/editUser/*' element={<EditUser />} />
                                    </>
                                }
                            </>
                        }
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    )
}
export default Routs;
