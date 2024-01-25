import React, { useContext, useEffect, useState } from 'react';
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
import { UserContext } from './contexts/UserContext';


const Routs = () => {
    
    const { isToken, idRole } = useContext(UserContext);

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
