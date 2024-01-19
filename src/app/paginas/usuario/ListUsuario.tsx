import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './listUsuario.module.css';
import { useNavigate } from 'react-router-dom';
import usuarioService from './usuario.service';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Toast from '../../components/Toast/Toast';
import { ListUsuarioType } from '../../types/types';

export default function ListUsuario() {

    const navigate = useNavigate();
    const [listUsuario, setListUsuario] = useState([]);

    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isToast, setIsToast] = useState(false);

    const listUsuarios = async () => {
        const resp = await usuarioService.listUsuario();
        setListUsuario(resp.usuario);
    }

    const deleteUsuarioById = async (id: number) => {
        const alertConfirm = window.confirm('Deseja mesmo remover este usuário?');
        if (alertConfirm) {
            const resp = await usuarioService.deleteUsuarioById(id);

            if (resp.response) {
                setToastMessage('Usuário apagado com sucesso!');
                setToastIcon('success');
                setIsToast(true);
                listUsuarios();
            }
        }
        setIsToast(false);
    }

    useEffect(() => {
        listUsuarios();
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
                                    <th>IdUsuario</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Perfil</th>
                                    <th>Editar</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsuario.length > 0 ?
                                    listUsuario.map((e: ListUsuarioType, i: number) =>
                                        <tr key={i}>
                                            <td>{e.idUsuario}</td>
                                            <td>{e.nome}</td>
                                            <td>{e.user.email}</td>
                                            <td>{e.user.role.nome}</td>
                                            <td><Button onClick={() => navigate('/editUsuario/' + e.user.id)}><Edit /></Button></td>
                                            <td><Button onClick={() => deleteUsuarioById(e.user.id)}><DeleteIcon /></Button></td>
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