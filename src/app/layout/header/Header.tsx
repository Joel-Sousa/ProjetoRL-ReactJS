import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Toolbar, CssBaseline, Typography, IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles'
import { Link, useNavigate } from "react-router-dom";
import loginService from '../../pages/login/login.service';
import styles from './header.module.css';
import { UserContext } from '../../contexts/UserContext';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toast from '../../components/Toast/Toast';


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
    const ITEM_HEIGHT = 48;

    const classes = useStyles();

    const { isToken, roles_id, userData } = useContext(UserContext);

    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isToast, setIsToast] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const exit = async () => {
        
        const resp = await loginService.logout();

        setToastMessage('Ate logo!');
            setToastIcon('success');
            setIsToast(true);

            handleClose();

            setTimeout(() => {
                setIsToast(false);
            },100)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Toast open={isToast} icon={toastIcon} mensagem={toastMessage} timer={3000} />

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
                        
                        <div>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                                style={{ color: 'white' }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    "aria-labelledby": "long-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: "20ch",
                                    },
                                }}
                            >
                                <Link to='/createUser' style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem onClick={handleClose}>
                                                Criar Usuario
                                            </MenuItem>
                                        </Link>
                                {isToken ?
                                    <div>
                                        {roles_id === 1 &&
                                            <Link to='/listUser' style={{ textDecoration: 'none', color: 'black' }}>
                                                <MenuItem onClick={handleClose}>
                                                    Listar usuarios
                                                </MenuItem>
                                            </Link>
                                        }
                                        <MenuItem onClick={exit}>
                                            Sair
                                        </MenuItem>
                                    </div>
                                    :
                                    <div>
                                        <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem onClick={handleClose}>
                                                Login
                                            </MenuItem>
                                        </Link>
                                    </div>
                                }
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
}