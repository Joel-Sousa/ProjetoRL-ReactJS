import React, { useState } from 'react';
import Routs from './Routes'
import { BrowserRouter } from 'react-router-dom';
import { ContextUser } from './contexts/UserContext';


const App = () => {

  return (    
    <BrowserRouter>
      <ContextUser>
        <Routs />
      </ContextUser>
    </BrowserRouter>
  )
}
export default App;