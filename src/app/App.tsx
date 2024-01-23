import React, { useState } from 'react';
import Routs from './Routes'
import { BrowserRouter } from 'react-router-dom';
import { ContextUser } from './contexts/UserContext';


const App = () => {

  return (
    <>
    {/* <UserContext.Provider value={{state, setState}}> */}
    <ContextUser>
        <BrowserRouter>
          <Routs />
        </BrowserRouter>
    </ContextUser>
    {/* </UserContext.Provider> */}
    </>
  )
}
export default App;