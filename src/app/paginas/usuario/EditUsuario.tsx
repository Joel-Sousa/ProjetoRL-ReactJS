import React, { useEffect, useState } from 'react';
import styles from './createUsuario.module.css';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import usuarioService from './usuario.service';
import Toast from '../../components/Toast/Toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UsuarioType } from '../../types/types';

export default function EditUsuario() {

    const location = useLocation();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue } = useForm<UsuarioType>();
    const { setError, formState: { errors } } = useForm();

    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isToast, setIsToast] = useState(false);
    const [idUsuario, setIdUsuario] = useState(0);

    const onSubmit = async (data: UsuarioType) => {
        data.id = idUsuario;

        const resp = await usuarioService.updateUsuario(data);

        if (resp.response) {
            setToastMessage('Usuário alterado com sucesso!');
            setToastIcon('success');
            setIsToast(true);
            navigate('/listUsuario');
        } else if (resp.error.erro) {
            resp.error.data.forEach((e: { label: string, erro: string }) => {
                setError(e.label, { message: e.erro })
            });
        }

        setIsToast(false);
    }

    useEffect(() => {
        const id = parseInt(location.pathname.split('/')[2]);
        setIdUsuario(id);

        if (id != 0) {
            (async () => {
                const resp = await usuarioService.getUsuarioById(id);

                if (!!resp.usuario) {
                    setValue('nome', resp.usuario.nome);
                    setValue('email', resp.usuario.user.email);
                }
            })()
        }

    }, [])

    return (
        <div className={styles.section}>
            <Toast open={isToast} icon={toastIcon} mensagem={toastMessage} timer={3000} />
            <Card className='cardSection' style={{ width: '40vw' }}>
                <CardContent>
                    <Typography className='text-center' gutterBottom variant='h5' component='h2'>Editar usuario</Typography>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <div className='row m-1'>
                            <TextField
                                {...register('nome')}
                                className='mb-2 mt-2'
                                label="Nome (*)"
                                variant="outlined"
                                type='text'
                                error={errors.nome ? true : false}
                                helperText={errors.nome && errors.nome.message?.toString()}
                                autoComplete='off'
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                {...register('email')}
                                className='mb-2'
                                label="Email (*)"
                                variant="outlined"
                                type='text'
                                error={errors.email ? true : false}
                                helperText={errors.email && errors.email.message?.toString()}
                                autoComplete='off'
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                {...register('password')}
                                className='mb-2'
                                label="Senha"
                                variant="outlined"
                                type='password'
                                error={errors.password ? true : false}
                                helperText={errors.password && errors.password.message?.toString()}
                                autoComplete='off'
                                InputLabelProps={{ shrink: true }}
                            />

                            <div>
                                <Button
                                    variant="contained"
                                    type='submit'>Salvar</Button>
                                &nbsp;
                                <Button
                                    variant="contained" color='inherit'
                                    type='reset'>Limpar</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
