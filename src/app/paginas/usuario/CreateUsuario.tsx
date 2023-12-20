import React, { useState } from 'react';
import styles from './createUsuario.module.css';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import usuarioService from './usuario.service';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';

export default function CreateUsuario() {

    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isToast, setIsToast] = useState(false);

    const onSubmit = async (data: any) => {

        const resp = await usuarioService.createUsuario(data);

        if (resp.response) {
            setToastMessage('Usuário criado com sucesso!');
            setToastIcon('success');
            setIsToast(true);
            navigate('/');
        }

        setIsToast(false);
    }

    return (
        <div className={styles.section}>
            <Toast open={isToast} icon={toastIcon} mensagem={toastMessage} timer={3000} />
            <Card className='cardSection' style={{ width: '40vw' }}>
                <CardContent>
                    <Typography className='text-center' gutterBottom variant='h5' component='h2'>Criar usuario</Typography>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <div className='row m-1'>
                            <TextField
                                {...register('nome', { required: true })}
                                className='mb-2'
                                label="Nome (*)"
                                variant="outlined"
                                type='text'
                                error={errors.nome ? true : false}
                                helperText={errors.nome && 'Campo de nome invalido!'}
                                autoComplete='off'
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
                            />

                            <TextField
                                {...register('password', { required: true })}
                                className='mb-2'
                                label="Senha (*)"
                                variant="outlined"
                                type='password'
                                error={errors.password ? true : false}
                                helperText={errors.password && 'Campo de senha invalido!'}
                                autoComplete='off'
                            />
                            <div>
                                <Button
                                    variant="contained"
                                    type='submit'>Cadastrar</Button>
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
