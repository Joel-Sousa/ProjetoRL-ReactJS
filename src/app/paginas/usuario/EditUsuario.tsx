import React, { useEffect, useState } from 'react';
import styles from './createUsuario.module.css';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import usuarioService from './usuario.service';
import Toast from '../../components/Toast/Toast';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EditUsuario() {

    const navigate = useNavigate();
    const { register, handleSubmit, setError,watch, setValue, formState: { errors } } = useForm();
    const location = useLocation();

    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isToast, setIsToast] = useState(false);
    const [idUsuario, setIdUsuario] = useState('');

    const onSubmit = async (data: any) => {
        const resp = await usuarioService.updateUsuario(data);

        if (resp.response) {
            setToastMessage('Usuário alterado com sucesso!');
            setToastIcon('success');
            setIsToast(true);
            navigate('/listUsuario');
        }

        setIsToast(false);
    }

    useEffect(() => {
        const id = location.pathname.split('/')[2];
        setIdUsuario(id);

        if (id != '') {
            (async () => {
                const resp = await usuarioService.getUsuarioById(id);

                if (!!resp.usuario) {
                    setValue('id', resp.usuario.user.id);
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
                            <input {...register('id', { required: true })} hidden value={watch('id')} />
                            <TextField
                                {...register('nome', { required: true })}
                                className='mb-2 mt-2'
                                label="Nome (*)"
                                variant="outlined"
                                type='text'
                                error={errors.nome ? true : false}
                                helperText={errors.nome && 'Campo de nome invalido!'}
                                autoComplete='off'
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                {...register('email', { required: true })}
                                className='mb-2'
                                label="Email (*)"
                                variant="outlined"
                                type='text'
                                error={errors.email ? true : false}
                                helperText={errors.email && 'Campo de email invalido!'}
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
                                helperText={errors.password && 'Campo de senha invalido!'}
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
