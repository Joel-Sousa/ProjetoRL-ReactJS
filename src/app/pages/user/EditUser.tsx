import React, { useContext, useEffect, useState } from 'react';
import styles from './createUser.module.css';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import userService from './user.service';
import Toast from '../../components/Toast/Toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserType } from '../../types/types';
import { UserContext } from '../../contexts/UserContext';

export default function EditUser() {

    const { isToken, roles_id } = useContext(UserContext);

    const location = useLocation();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, watch } = useForm<UserType>();
    const { setError, formState: { errors } } = useForm();

    const [toastMessage, setToastMessage] = useState('');
    const [toastIcon, setToastIcon] = useState('');
    const [isToast, setIsToast] = useState(false);
    const [users_id, setUsers_id] = useState(0);
    const [role_id, setRole_id] = useState('');

    const onSubmit = async (data: UserType) => {
        data.id = users_id;

        const resp = await userService.updateUserData(data);

        if (resp.response) {
            setToastMessage('Usuário alterado com sucesso!');
            setToastIcon('success');
            setIsToast(true);
            navigate('/listUser');
        } else if (resp.error.erro) {
            resp.error.data.forEach((e: { label: string, erro: string }) => {
                setError(e.label, { message: e.erro })
            });
        }

        setIsToast(false);
    }

    useEffect(() => {
        const id = parseInt(location.pathname.split('/')[2]);
        setUsers_id(id);

        if (id !== 0) {
            (async () => {
                const resp = await userService.getUserDataById(id);

                if (!!resp.userData) {
                    setValue('name', resp.userData.name);
                    setValue('email', resp.userData.user.email);
                    setValue('roles_id', resp.userData.user.roles_id);
                    setRole_id(resp.userData.user.roles_id);
                }
            })()
        }

    }, [])

    const handleChangePerfil = (e: string) => {
        setRole_id(e)
        setValue('roles_id', e)
    }

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
                                {...register('name')}
                                className='mb-2 mt-2'
                                label="Nome (*)"
                                variant="outlined"
                                type='text'
                                error={errors.name ? true : false}
                                helperText={errors.name && errors.name.message?.toString()}
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
                            {roles_id == 1 &&
                                <FormControl>
                                    <InputLabel>Perfil</InputLabel>
                                    <input {...register('roles_id', { required: false })} defaultValue={role_id} hidden />
                                    <Select
                                        {...register('roles_id', { required: false })}
                                        className='mb-2'
                                        value={role_id}
                                        label='Perfil'
                                        onChange={(e) => handleChangePerfil(e.target.value)}
                                    >
                                        <MenuItem value={'1'} >Administrador</MenuItem>
                                        <MenuItem value={'2'} >Usuario</MenuItem>
                                    </Select>
                                </FormControl>
                            }

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
