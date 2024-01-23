import React, { useState } from 'react';
import styles from './createUser.module.css';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import userService from './user.service';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';
import { UserType } from '../../types/types';

export default function CreateUser() {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<UserType>();
    const { setError, formState: { errors } } = useForm();

    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isToast, setIsToast] = useState(false);

    const onSubmit = async (data: UserType) => {

        const resp = await userService.createUserData(data);

        if (resp.response) {
            setToastMessage('Usuário criado com sucesso!');
            setToastIcon('success');
            setIsToast(true);
            navigate('/');
        }else if(resp.error.erro){
            resp.error.data.forEach((e: {label: string, erro: string}) => {
                setError(e.label, {message: e.erro})
              });
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
                                {...register('name')}
                                className='mb-2'
                                label="Nome (*)"
                                variant="outlined"
                                type='text'
                                error={errors.name ? true : false}
                                helperText={errors.name && errors.name.message?.toString()}
                                autoComplete='off'
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
                            />

                            <TextField
                                {...register('password')}
                                className='mb-2'
                                label="Senha (*)"
                                variant="outlined"
                                type='password'
                                error={errors.password ? true : false}
                                helperText={errors.password && errors.password.message?.toString()}
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
