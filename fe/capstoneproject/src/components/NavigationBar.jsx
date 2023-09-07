import React, { useEffect } from 'react';
import logoImage from '../assets/logo.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchDesigner } from '../redux/designersSlice';
import { getDesignerDetails, getClientDetails } from '../redux/usersSlice';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavigationBar.css';
import jwtDecode from 'jwt-decode';

const NavigationBar = () => {

  const handleLogOut = () => {
    localStorage.removeItem("userLoggedIn");
    window.location.href = "/";
  }

  //const userId = useSelector((state)=> state.designers.userId);
  //const isLogged = useSelector((state)=> state.designers.isLogged);
  const isLogged = useSelector((state)=> state.users.isLogged);
  const designer = useSelector((state)=> state.users.designer);
  const client = useSelector((state)=> state.users.client);

  const dispatch = useDispatch();
  const token = localStorage.getItem('userLoggedIn');
  //const decodedToken = jwtDecode(token);
  //const userId = decodedToken._id;
  //const userRole = decodedToken.role;
  //const user = useSelector(state => state.users.user);

  let decodedToken;
  let userId;
  let userRole;

  if (token) {
    decodedToken = jwtDecode(token);
    userId = decodedToken._id;
    userRole = decodedToken.role;
}

  useEffect(() => {
      if (token) {
          if (userRole === 'Designer') {
              dispatch(getDesignerDetails(userId));
          } else if (userRole === 'Client') {
              dispatch(getClientDetails(userId));
          }
      }
  }, [dispatch, token, userId, userRole]);



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
            <Link to="/">
              <Navbar.Brand><img src={logoImage} alt="Logo" className="logo"/></Navbar.Brand>
            </Link>
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
                  <span className='user-hi me-2'>Hi <span className='user-nickname'>{designer.designer.nickname}</span></span>
                  <img src={designer.designer.avatar} alt="User Avatar" className="user-avatar" />
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
