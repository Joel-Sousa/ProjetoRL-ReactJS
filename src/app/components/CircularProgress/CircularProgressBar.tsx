import { CircularProgress, Modal } from '@mui/material';
import React from 'react';

export default function CircularProgressBar(props: any){

    return(
        <Modal open={props.open}>
            <div className='' style={{ height: '100%', width: '100%', paddingTop: '25%' }}>
               <span style={{ marginLeft: '48%'}}>
               <CircularProgress/>
               </span>
            </div>
         </Modal>
    );
}