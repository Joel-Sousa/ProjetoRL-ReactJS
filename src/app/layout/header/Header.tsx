import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, CssBaseline, Typography} from "@mui/material";
import { makeStyles } from '@mui/styles'
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import loginService from '../../pages/login/login.service';
import styles from './header.module.css';
import { UserContext } from '../../contexts/UserContext';

const useStyles = makeStyles(() => ({
    header: {
        background: '#424242',
    },
    navlinks: {
        display: "flex",
        textDecoration: "none",
    },
    logo: {
        flexGrow: "2",
        cursor: "pointer",
    },
    link: {
        textDecoration: "none",
        marginRight: 5,
        color: "white",
    },
}));

export default function Header() {
    
    const classes = useStyles();
    
    const { isToken, idRole, userData } = useContext(UserContext);
    
    const exit = async () => {
        const resp = await loginService.logout();
    }

    return (
        <>
            <div className={styles.header}>
                <AppBar position="static">
                    <CssBaseline />
                    <Toolbar className={classes.header}>
                        <Typography variant="h4" className={classes.logo}>
                            {isToken ?
                                <Link to='/homePage' className={classes.link}>Sys-{userData.name + ' | ' + userData.profile}</Link>
                                :
                                <Link to='/' className={classes.link}>Sys</Link>
                            }
                        </Typography>
                        <div className={classes.navlinks}>
                            <>
                                {isToken ?
                                    <>
                                        {idRole === 1 &&
                                            <Link to='/listUser'>
                                                <Button variant="contained" >Listar usuarios</Button>
                                            </Link>
                                        }
                                        &nbsp;
                                        <span className={classes.link}>
                                            <Button className={classes.link} variant="contained" onClick={exit} >Sair</Button>
                                        </span>
                                    </>
                                    :
                                    <>
                                        <Link to='/createUser'>
                                            <Button className='w-100' variant="contained" >+Usuario</Button>
                                        </Link>
                                        &nbsp;
                                        {/* <Button className='w-100' variant="contained" onClick={handleClickOpen}>Login</Button> */}
                                        <Link to='/login'>
                                            <Button className='w-100' variant="contained" >Login</Button>
                                        </Link>
                                    </>
                                }
                            </>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
}