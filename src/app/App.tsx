import React, { useState } from 'react';
import Routs from './Routes'
import { BrowserRouter } from 'react-router-dom';
import { ContextUser } from './contexts/UserContext';


const App = () => {

  return (
    <ContextUser>
        <BrowserRouter>
          <Routs />
        </BrowserRouter>
    </ContextUser>
  )
}
export default App;