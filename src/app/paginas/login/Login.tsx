import React from 'react';
import { useForm } from 'react-hook-form';
import loginService from './login.service';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import { LoginType } from '../../types/types';

export default function Login(props: {fecharDialog: (data: boolean) => void}) {

  const navigate = useNavigate();
  const { register, handleSubmit, } = useForm<LoginType>(); 
  const { setError, formState: { errors }  } = useForm();

  const onSubmit = async (data: LoginType) => {

    const resp = await loginService.login(data);

    if (resp.token) {
      props.fecharDialog(false);
      navigate('/paginaInicial');
    }else if(resp.error.erro){
      resp.error.data.forEach((e: {label: string, erro: string}) => {
        setError(e.label, {message: e.erro})
      });
    }else if(resp.error){
      setError('email', {});
      setError('password', {});
    }
  }

  return (
    <div>
      <Typography className='text-center' gutterBottom variant='h5' component='h2'>Login</Typography>
      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
            <TextField
              {...register('email')}
              className='mb-2 w-full'
              label="Email"
              variant="outlined"
              type='text'
              error={errors.email ? true : false}
              helperText={errors.email && errors.email.message?.toString()}
              />

            <TextField
              {...register('password')}
              className='mb-2 w-full'
              label="Senha"
              variant="outlined"
              type='password'
              error={errors.password ? true : false}
              helperText={errors.password && errors.password.message?.toString()}
              />
          <Button
            variant="contained"
            type='submit'>Login</Button>

        </div>
      </form>
    </div>
  )
}