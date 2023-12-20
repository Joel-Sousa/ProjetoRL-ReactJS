import React from 'react';
import { useForm } from 'react-hook-form';
import loginService from './login.service';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

export default function Login(props: any) {

  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {

    const resp = await loginService.login(data);

    if (resp.token) {
      props.fecharDialog(false);
      navigate('/paginaInicial');
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
              {...register('email', { required: true })}
              className='mb-2 w-full'
              label="Email"
              variant="outlined"
              type='text'
              error={errors.email ? true : false}
              helperText={errors.email && 'Campo de email invalido!'}
              />

            <TextField
              {...register('password', { required: true })}
              className='mb-2 w-full'
              label="Senha"
              variant="outlined"
              type='password'
              error={errors.password ? true : false}
              helperText={errors.password && 'Campo de senha invalido!'}
              />
          <Button
            variant="contained"
            type='submit'>Login</Button>

        </div>
      </form>
    </div>
  )
}