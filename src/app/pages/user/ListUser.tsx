import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './listUser.module.css';
import { useNavigate } from 'react-router-dom';
import userService from './user.service';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Toast from '../../components/Toast/Toast';
import { ListUserType } from '../../types/types';
import CircularProgressBar from '../../components/CircularProgress/CircularProgressBar';
import { env } from '../../../env/env';

export default function ListUser() {

    const navigate = useNavigate();
    const [listUser, setListUser] = useState([]);

    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isToast, setIsToast] = useState(false);
    const [isCircularProgressBar, setIsCircularProgressBar] = useState(false);

    const listUsers = async () => {
        const resp = await userService.listUserData();
        setListUser(resp.userData);
    }

    const deleteUserById = async (id: number) => {
        const alertConfirm = window.confirm('Deseja mesmo remover este usuário?');
        if (alertConfirm) {
            setIsCircularProgressBar(true);

            const resp = await userService.deleteUserDataById(id);

            if (resp.response) {
                setToastMessage('Usuário apagado com sucesso!');
                setToastIcon('success');
                setIsToast(true);
                listUsers();
            }
        }
        setIsCircularProgressBar(false);
        setIsToast(false);
    }

    useEffect(() => {
        listUsers();
    }, []);

    const usersPrint = async () =>{
        const resp = await userService.usersPrint();

        const pdfUrl = `${env.fileLink}${resp}`;
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.target = '_blank';
        link.download = 'certificado.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }

    return (
        <>
            <CircularProgressBar open={isCircularProgressBar} />
            <Toast open={isToast} icon={toastIcon} mensagem={toastMessage} timer={3000} />
            <div className={styles.section}>

                <Card sx={{ maxWidth: '90%' }}>
                    <CardContent>
                        <Typography className='text-center' gutterBottom variant='h5' component='h2'>
                            Listar Usuario
                            &nbsp;
                        <Button variant="contained" onClick={usersPrint}>Imprimir Usuarios</Button>
                </Typography>

                        <table className='table table-bordered' border={1}>
                            <thead>
                                <tr>
                                    <th>Id Usuario</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Perfil</th>
                                    <th>Editar</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser.length > 0 ?
                                    listUser.map((e: ListUserType, i: number) =>
                                        <tr key={i}>
                                            <td>{e.id}</td>
                                            <td>{e.name}</td>
                                            <td>{e.user.email}</td>
                                            <td>{e.user.role.name}</td>
                                            <td><Button onClick={() => navigate('/editUser/' + e.user.id)}><Edit /></Button></td>
                                            <td><Button onClick={() => deleteUserById(e.user.id)}><DeleteIcon /></Button></td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td colSpan={4}><p>Sem resultados!</p></td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    )

}