import React from 'react';
import logoImage from '../assets/logo.png';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
  <Navbar expand="lg" className="navbar">
      <Container >
        <div className='container d-flex justify-content-between align-items-center w-100'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="me-auto ">
            <Nav.Link href="#home" className='links'>Designers</Nav.Link>
            <Nav.Link href="#link" className='links'>Job Offers</Nav.Link>
            <Nav.Link href="#link" className='links'>How it works</Nav.Link>
          </Nav>
          </Navbar.Collapse>
          <div className="position-relative" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <Navbar.Brand><img src={logoImage} alt="Logo" className="logo"/></Navbar.Brand>
          </div>
          <Navbar.Collapse id="basic-navbar-nav ">
          <div className='ms-auto'>
          <Form className="d-flex mx-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="search me-2"
              aria-label="Search"
            />
            <Link to="/signup-options">
              <Button className='nav-buttons mx-2'>SignUp</Button>
            </Link>
            <Button className='nav-buttons mx-2'>LogIn</Button>
          </Form>
          </div>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>    
  );
};

export default NavigationBar;
