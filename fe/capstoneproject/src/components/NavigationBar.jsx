import React, { useEffect } from 'react';
import logoImage from '../assets/logo.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDesignerDetails, getClientDetails } from '../redux/usersSlice';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavigationBar.css';

const NavigationBar = () => {

  const handleLogOut = () => {
    localStorage.removeItem("userLoggedIn");
    window.location.href = "/";
  }

  const isLogged = useSelector((state)=> state.users.isLogged);
  const designer = useSelector((state)=> state.users.designer);
  const client = useSelector((state)=> state.users.client);
  const role = useSelector((state)=> state.users.role);
  const designerId = useSelector((state)=> state.users.designerId);
  const clientId = useSelector((state)=> state.users.clientId);

  const dispatch = useDispatch();
  const token = localStorage.getItem('userLoggedIn');

  useEffect(() => {
      if (token) {
          if (role === 'Designer') {
              dispatch(getDesignerDetails(designerId));
          } else if (role === 'Client') {
              dispatch(getClientDetails(clientId));
          }
      }
  }, [dispatch, token, designerId, clientId, role]);



  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <div className='container d-flex justify-content-between align-items-center w-100'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            {isLogged && (
              <Nav className="me-auto">
                {role === 'Designer' ? (
                  <>
                    <Nav.Link href="#home" className='links'>Companies</Nav.Link>
                    <Nav.Link href="#link" className='links'>Job Offers</Nav.Link>
                    <Nav.Link href="#link" className='links'>How it works</Nav.Link>
                  </>
                ) : role === 'Client' ? (
                  <>
                    <Nav.Link href="#home" className='links'>Designers</Nav.Link>
                    <Nav.Link href="#link" className='links'>Projects</Nav.Link>
                    <Nav.Link href="#link" className='links'>How it works</Nav.Link>
                  </>
                ) : null}
              </Nav>
            )}
          </Navbar.Collapse>
          <div className="position-relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Link to="/">
              <Navbar.Brand><img src={logoImage} alt="Logo" className="logo"/></Navbar.Brand>
            </Link>
          </div>
          <Navbar.Collapse id="basic-navbar-nav ">
            <div className='ms-auto'>
              {isLogged ? (
                <div className='d-flex justify-content-center align-items-center'>
                  <Form className="d-flex mx-2">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="search me-2"
                      aria-label="Search"
                    />
                  </Form>
                  {role === 'Designer' ? (
                    <>
                      <Link to="/create-project">
                        <Button className='nav-buttons mx-2'>Project+</Button>
                      </Link>
                      <Button className='logout-button mx-2' onClick={handleLogOut}>LogOut</Button>
                      {designer && (
                        <>
                          <span className='user-hi me-2'>Hi <span className='user-nickname'>{designer.designer.nickname}</span></span>
                          <img src={designer.designer.avatar} alt="User Avatar" className="user-avatar" />
                        </>
                      )}
                    </>
                  ) : role === 'Client' ? (
                    <>
                      <Button className='nav-buttons mx-2'>Offer+</Button>
                      <Button className='logout-button mx-2' onClick={handleLogOut}>LogOut</Button>
                      {client && (
                        <>
                          <span className='user-hi me-2'>Hi <span className='user-company'>{client.client.company}</span></span>
                          <img src={client.client.avatar} alt="User Avatar" className="user-avatar" />
                        </>
                      )}
                    </>
                  ) : null}
                </div>
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
