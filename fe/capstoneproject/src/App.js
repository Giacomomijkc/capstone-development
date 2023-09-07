import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import SingUpDesignerPage from './pages/SingUpDesignerPage';
import SingUpOptionsPage from './pages/SignUpOptionsPage';
import LogInPage from './pages/LogInPage';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import { setIsLogged, setToken } from '../src/redux/usersSlice';
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userLoggedIn');
    if (token) {
      dispatch(setIsLogged(true));
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}/>

        </Route>
        <Route path="/signup-options" element={<SingUpOptionsPage/>}/>
        <Route path="/signup-designer" element={<SingUpDesignerPage/>}/>
        <Route path="/login" element={<LogInPage/>}/>
        <Route path="projects/:projectId" element={<ProjectDetailsPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
