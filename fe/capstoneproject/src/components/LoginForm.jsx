import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login } from '../redux/usersSlice';
import { setUserId} from '../redux/designersSlice';
import { setIsLogged } from '../redux/usersSlice';
import jwtDecode from 'jwt-decode';
import './LoginForm.css';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector((state) => state.users.error);
    const successMessage = useSelector((state) => state.users.successMessage);
    //const setRole = useSelector((state) => state.users.role);
    const userId = useSelector((state)=> state.designers.userId);
    //const isLogged = useSelector((state)=> state.designers.isLogged);
    const isLogged = useSelector((state)=> state.users.isLogged);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          // Chiamata al login con Redux Thunk
          const response = await dispatch(login({ email, password }))
          //per gestirla .then((res) =>{})

          if (login.fulfilled.match(response)) {
            setTimeout(() => {
                navigate('/dashboard');
              }, 2000);
              const token = localStorage.getItem('userLoggedIn');
              const decodedToken = jwtDecode(token);
              const designerId = decodedToken._id;
              dispatch(setUserId(designerId));
              //dispatch(setIsLogged(true));

        }
          // Se il login ha avuto successo, puoi fare altre azioni, come reindirizzare l'utente
        } catch (error) {
          // Gestisci l'errore qui, ad esempio mostrando un messaggio di errore all'utente
          //dispatch(setError(err.message));
        }
      };


  return (
    <Form style={{ width: '30rem'}} className='form' onSubmit={handleLogin}>
        <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Email" 
                                name="email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Password" 
                                name="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div>
                            <Button 
                            className='form-button' 
                            type="submit" 
                            variant="success">
                                Login
                            </Button>
                            {error && (
                                <div className="alert alert-danger me-auto mt-2" role="alert">
                                    {error}
                                </div>
                            )}
                            {successMessage && (
                                <div className="alert alert-success me-auto mt-2" role="alert">
                                    {successMessage}
                                </div>
                            )}
                        </div>
        </div>
    </Form>
  )
}

export default LoginForm