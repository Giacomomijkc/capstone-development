import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './LoginForm.css';

const LoginForm = () => {
  return (
    <Form className='form'>
        <div className='row'>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Name" 
                                name="name"  
                                />
                            </Form.Group>
                        </div>
                        <div className='col-md-6'>
                            <Form.Group className="mb-3" controlId="createAuthorForm.ControlInput2">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control 
                                className='input'
                                type="text" 
                                placeholder="Your Surname" 
                                name="surname" 
                                />
                            </Form.Group>
                        </div>
                        <Button 
                        className='form-button' 
                        type="submit" 
                        variant="success">
                            Login
                        </Button>
        </div>
    </Form>
  )
}

export default LoginForm