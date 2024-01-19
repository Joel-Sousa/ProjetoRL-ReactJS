import React, {useEffect, useState } from 'react';
import { AppBar, Toolbar, CssBaseline, Typography, Dialog, DialogContent } from "@mui/material";
import { makeStyles } from '@mui/styles'
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import loginService from '../../paginas/login/login.service';
import styles from './cabecalho.module.css';
import Login from '../../paginas/login/Login';

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

export default function Cabecalho() {

    const classes = useStyles();
    const isLogged = loginService.isLogged();
    const [open, setOpen] = useState(false);
    
    const sair = async () => {
        const resp = await loginService.logout();
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fecharDialog = (status: boolean) => {
        setOpen(status);
    }
    
    const [idRole, setIdRole] = useState(0);
    
    (async (isLogged) => {
        if (isLogged) {
            const resp = await loginService.permission();
            setIdRole(resp?.user?.idRole);
        }
    })(isLogged)

    return (
        <>
            <div className={styles.cabecalho}>
                <AppBar position="static">
                    <CssBaseline />
                    <Toolbar className={classes.header}>
                        <Typography variant="h4" className={classes.logo}>
                            {isLogged ?
                                <Link to='/paginaInicial' className={classes.link}>Sys-{`'tst'}`}</Link>
                                :
                                <Link to='/' className={classes.link}>Sys</Link>
                            }
                        </Typography>
                        <div className={classes.navlinks}>
                            <>
                                {isLogged ?
                                    <>
                                        {idRole == 1 &&
                                            <Link to='/listUsuario'>
                                                <Button variant="contained" >Listar usuarios</Button>
                                            </Link>
                                        }
                                        &nbsp;
                                        <span className={classes.link}>
                                            <Button className={classes.link} variant="contained" onClick={sair} >Sair</Button>
                                        </span>
                                    </>
                                    :
                                    <>
                                        <Link to='/createUsuario'>
                                            <Button className='w-100' variant="contained" >+Usuario</Button>
                                        </Link>
                                        &nbsp;
                                        <Button className='w-100' variant="contained" onClick={handleClickOpen}>Login</Button>
                                    </>
                                }
                            </>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Login fecharDialog={fecharDialog} />
                </DialogContent>

            </Dialog>
        </>
    )
}