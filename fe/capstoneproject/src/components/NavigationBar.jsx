import React, { useEffect } from 'react';
import logoImage from '../assets/logo.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchDesigner } from '../redux/designersSlice';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavigationBar.css';

const NavigationBar = () => {

  const handleLogOut = () => {
    localStorage.removeItem("userLoggedIn");
    window.location.href = "/";
  }

  const userId = useSelector((state)=> state.designers.userId);
  const isLogged = useSelector((state)=> state.designers.isLogged);
  const designer = useSelector((state)=> state.designers.designer);

  console.log(designer)

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchDesigner())
  }, [])

  return (
  <Navbar expand="lg" className="navbar">
      <Container >
        <div className='container d-flex justify-content-between align-items-center w-100'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          {isLogged &&
                      <Nav className="me-auto ">
                      <Nav.Link href="#home" className='links'>Designers</Nav.Link>
                      <Nav.Link href="#link" className='links'>Job Offers</Nav.Link>
                      <Nav.Link href="#link" className='links'>How it works</Nav.Link>
                    </Nav>
          }
          </Navbar.Collapse>
          <div className="position-relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Navbar.Brand><img src={logoImage} alt="Logo" className="logo"/></Navbar.Brand>
          </div>
          <Navbar.Collapse id="basic-navbar-nav ">
          <div className='ms-auto'>
          {isLogged ? (
              designer ? (
                <div className='d-flex justify-content-center align-items-center'>
                  <Form className="d-flex mx-2">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="search me-2"
                      aria-label="Search"
                    />
                  </Form>
                  <Button className='nav-buttons mx-2'>Project+</Button>
                  <Button className='logout-button mx-2' onClick={handleLogOut}>LogOut</Button>
                  <span className='user-hi me-2'>Hi <span className='user-nickname'>{designer.nickname}</span></span>
                  <img src={designer.avatar} alt="User Avatar" className="user-avatar" />
                </div>
              ) : (
                // Gestisci il caso in cui designer sia undefined o null
                null
              )
            ) : (
                <Form className="d-flex mx-2">
                  <Link to="/signup-options">
                    <Button className='nav-buttons mx-2'>SignUp</Button>
                  </Link>
                  <Link to="/login">
                    <Button className='nav-buttons mx-2'>LogIn</Button>
                  </Link>
                </Form>
              )}
          </div>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>    
  );
};

export default NavigationBar;
