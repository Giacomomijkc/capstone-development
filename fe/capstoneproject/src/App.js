import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import SingUpDesignerPage from './pages/SingUpDesignerPage';
import SingUpOptionsPage from './pages/SignUpOptionsPage';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route path="/signup-options" element={<SingUpOptionsPage/>}/>
        <Route path="/signup-designer" element={<SingUpDesignerPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
