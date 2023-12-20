import React, { useState } from 'react';
import Routs from './Routes'
import { BrowserRouter } from 'react-router-dom';

const App = () => {

  return (
    <>
        <BrowserRouter>
          <Routs />
        </BrowserRouter>
    </>
  )
}
export default App;