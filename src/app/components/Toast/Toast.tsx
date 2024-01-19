import React from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ToastType } from '../../types/types';

export default function Toast(props: ToastType) {
    
if(props.open){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: props.timer ? props.timer : 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    
    Toast.fire({
        icon: props.icon as SweetAlertIcon,
        title: props.mensagem
    })
    
}
   return (
        <>
        </>
    )
}
