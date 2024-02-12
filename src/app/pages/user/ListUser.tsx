import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './listUser.module.css';
import { useNavigate } from 'react-router-dom';
import userService from './user.service';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Toast from '../../components/Toast/Toast';
import { ListUserType } from '../../types/types';

export default function ListUser() {

    const navigate = useNavigate();
    const [listUser, setListUser] = useState([]);

    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isToast, setIsToast] = useState(false);

    const listUsers = async () => {
        const resp = await userService.listUserData();
        console.log("resp:", resp);
        setListUser(resp.userData);
    }

    const deleteUserById = async (id: number) => {
        const alertConfirm = window.confirm('Deseja mesmo remover este usuário?');
        if (alertConfirm) {
            const resp = await userService.deleteUserDataById(id);

            if (resp.response) {
                setToastMessage('Usuário apagado com sucesso!');
                setToastIcon('success');
                setIsToast(true);
                listUsers();
            }
        }
        setIsToast(false);
    }

    useEffect(() => {
        listUsers();
    }, [])

    return (
        <>
            <Toast open={isToast} icon={toastIcon} mensagem={toastMessage} timer={3000} />

            <div className={styles.section}>

                <Card sx={{ maxWidth: '90%' }}>
                    <CardContent>
                        <Typography className='text-center' gutterBottom variant='h5' component='h2'>Listar Usuario</Typography>

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