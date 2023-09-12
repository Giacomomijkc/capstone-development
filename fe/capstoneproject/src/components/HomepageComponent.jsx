import React from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';
import Homepage1 from '../assets/homepage-client-1.png';
import Homepage2 from '../assets/homepage-client-2.png';
import Homepage3 from '../assets/homepage-client-3.png';
import Homepage4 from '../assets/homepage-client-4.png';
import Homepage5 from '../assets/homepage-designer-1.png';
import Homepage6 from '../assets/homepage-designer-2.png';
import './HomepageComponent.css';

const HomepageComponent = () => {
    const designer = useSelector((state)=> state.users.designer);
    const client = useSelector((state)=> state.users.client);  
     
  return (
    <div>
    {client ? (
        <>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage1} alt="LoginCover" className='login-cover '/>
            </Col>
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily manage professional relationships with designers</h5>
                    </div>
                    <div>
                        <Link to="/dashboard" className='links'>
                            <Button className='dashboard-button'>Go to Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily manage deals with designers</h5>
                    </div>
                    <div>
                        <Link className='links' to="/dashboard">
                            <Button className='dashboard-button'>Go to Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </Col>
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage2} alt="LoginCover" className='login-cover '/>
            </Col>
        </Row>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage3} alt="LoginCover" className='login-cover '/>
            </Col>
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily find designers, artists and creative professionals</h5>
                    </div>
                    <div>
                        <Link className='links' to="/all-projects">
                            <Button className='dashboard-button links'>Find a talent</Button>
                        </Link>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily post your creative needs</h5>
                    </div>
                    <div>
                        <Link>
                            <Button className='dashboard-button links'>Post a jobOffer</Button>
                        </Link>
                    </div>
                </div>
            </Col>
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage4} alt="LoginCover" className='login-cover '/>
            </Col>
        </Row>
        </>
    ) : designer ? (
        <>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage1} alt="LoginCover" className='login-cover '/>
            </Col>
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily manage business relationships</h5>
                    </div>
                    <div>
                        <Link to="/dashboard" className='links'>
                            <Button className='dashboard-button'>Go to Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily manage deals with designers</h5>
                    </div>
                    <div>
                        <Link className='links' to="/dashboard">
                            <Button className='dashboard-button'>Go to Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </Col>
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage2} alt="LoginCover" className='login-cover '/>
            </Col>
        </Row>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage5} alt="LoginCover" className='login-cover '/>
            </Col>
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily find business opportunity</h5>
                    </div>
                    <div>
                        <Link className='links' to="/all-projects">
                            <Button className='dashboard-button links'>Find a Job</Button>
                        </Link>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily show your skills</h5>
                    </div>
                    <div>
                        <Link className='links' to="/create-project">
                            <Button className='dashboard-button links'>Post a Project</Button>
                        </Link>
                    </div>
                </div>
            </Col>
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage6} alt="LoginCover" className='login-cover '/>
            </Col>
        </Row>
        </>
    ) : (
        <>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage1} alt="LoginCover" className='login-cover '/>
            </Col>
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily manage creative works</h5>
                    </div>
                    <div>
                        <Link to="/signup-options" className='links'>
                            <Button className='dashboard-button'>SignUp</Button>
                        </Link>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily manage creative deals </h5>
                    </div>
                    <div>
                        <Link className='links' to="/signup-options">
                            <Button className='dashboard-button'>SignUp</Button>
                        </Link>
                    </div>
                </div>
            </Col>
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage2} alt="LoginCover" className='login-cover '/>
            </Col>
        </Row>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage5} alt="LoginCover" className='login-cover '/>
            </Col>
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily find or post business opportunity</h5>
                    </div>
                    <div>
                        <Link className='links' to="/signup-options">
                            <Button className='dashboard-button links'>SignUp</Button>
                        </Link>
                    </div>
                </div>
            </Col>
        </Row>
        <Row className="full-height">
            <Col md={6} className='col-md-6 p-0 d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5>Easily show or appreciate talent</h5>
                    </div>
                    <div>
                        <Link className='links' to="/signup-options">
                            <Button className='dashboard-button links'>SignUp</Button>
                        </Link>
                    </div>
                </div>
            </Col>
            <Col md={6} className='col-md-6 p-0'>
                <img src={Homepage6} alt="LoginCover" className='login-cover '/>
            </Col>
        </Row>
        </>
    )}
  </div>
  )
}

export default HomepageComponent