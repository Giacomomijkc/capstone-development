import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Button from "react-bootstrap/Button";
import React, { useEffect } from 'react';
import SingleProjectDesignerDashboard from '../components/SingleProjectDesignerDashboard';
import SingleDealDesignerDashboard from '../components/SingleDealDesignerDashboard';
import SingleLikedProjectDesignerDashboard from '../components/SingleLikedProjectDesignerDashboard';
import { useSelector, useDispatch } from 'react-redux';
import { getDesignerDetails, getClientDetails } from '../redux/usersSlice';
import { fetchDesigners } from '../redux/designersSlice';
import {  fetchProjectsLikedByDesigner } from '../redux/designersSlice';
import { fetchDesignerProjects } from '../redux/projectsSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();

  const designer = useSelector((state)=> state.users.designer);
  const designerProjects = useSelector((state)=> state.projects.designerProjects);
  const designerDeals = useSelector((state)=> state.deals.designerDeals);
  const client = useSelector((state)=> state.users.client);
  const clientJobOffer = useSelector((state)=> state.users.client?.client.job_offers);
  const role = useSelector((state)=> state.users.role);
  const designerId = useSelector((state)=> state.users.designerId);
  const clientId = useSelector((state)=> state.users.clientId);
  const designers = useSelector((state) => state.designers.designers);
  const likedProjects = useSelector((state) => state.designers.likedProjects)
  const token = localStorage.getItem('userLoggedIn');
 
  

  useEffect(() => {
    dispatch(fetchDesigners());
    if (token) {
        if (role === 'Designer') {
            dispatch(getDesignerDetails(designerId));
            dispatch(fetchDesignerProjects(designerId))
            dispatch(fetchProjectsLikedByDesigner(designerId));
        } else if (role === 'Client') {
            dispatch(getClientDetails(clientId));
        }
    }
}, [dispatch, token, designerId, clientId, role]);

  return (
    <>
    <NavigationBar/>
    <div className='container-dashboard mt-5'>
      {designer && role === 'Designer' && (
        <>
          <div className='d-flex justify-content-evenly align-items-center border-box-container border-box'>
            <div className='d-flex flex-column justify-content-center algin-items-center'>
              <span className='welcome'>Welcome</span>
              <span className='nickname'>{designer.designer.nickname}</span>
            </div>
            <div className='d-flex flex-column justify-content-center algin-items-center'>
              <Button className='edit-datas-button mb-2'>Edit personal info</Button>
              <Button className='make-deal-button mt-2'>Make a Deal</Button>
            </div>
          </div>
          <div className='d-flex justify-content-center algin-items-center mt-5' >
            <h2 className=''>You Posted <span  className='nickname'>{designerProjects?.length}</span> project</h2>
          </div>
          <div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
            <SingleProjectDesignerDashboard designerId={designerId} />
          </div>
          <div className='d-flex justify-content-center algin-items-center mt-5' >
            <h2 className=''>You Made <span  className='nickname'>{designerDeals?.length}</span> Deals</h2>
          </div>
          <div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
            <SingleDealDesignerDashboard designerId={designerId} />
          </div>
          <div className='d-flex justify-content-center algin-items-center mt-5' >
            <h2 className=''>You Liked <span  className='nickname'>{likedProjects?.length}</span> Projects</h2>
          </div>
          <div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
            {likedProjects && likedProjects.map((project) => (
              <SingleLikedProjectDesignerDashboard projectId={project.project_id} designers={designers} />
            ))}
          </div>
        </>
      )}

      {client && role === 'Client' && (
        <>
          <div className='d-flex justify-content-evenly align-items-center border-box-container border-box'>
            <div className='d-flex flex-column justify-content-center algin-items-center'>
              <span className='welcome'>Welcome</span>
              <span className='nickname'>{client.client.company}</span>
            </div>
            <div className='d-flex flex-column justify-content-center algin-items-center'>
              <Button className='edit-datas-button mb-2'>Edit personal info</Button>
              <Button className='make-deal-button mt-2'>Make a Job offer</Button>
            </div>
          </div>
          <div className='d-flex justify-content-center algin-items-center mt-5' >
            <h2 className=''>You Posted <span  className='nickname'>{clientJobOffer?.length}</span> Job Offer</h2>
          </div>
          {/*<div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
            <SingleProjectDesignerDashboard designerId={designerId} />
      </div>*/}
          <div className='d-flex justify-content-center algin-items-center mt-5' >
            <h2 className=''>You Have <span  className='nickname'></span> Deals</h2>
          </div>
          {/*<div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
            <SingleDealDesignerDashboard designerId={designerId} />
          </div>*/}
          <div className='d-flex justify-content-center algin-items-center mt-5' >
            <h2 className=''>You Liked <span  className='nickname'></span> Projects</h2>
          </div>
          {/*<div className='d-flex flex-wrap justify-content-center algin-items-center mb-5'>
            {likedProjects && likedProjects.map((project) => (
              <SingleLikedProjectDesignerDashboard projectId={project.project_id} designers={designers} />
            ))}
          </div>*/}
          {/* Ad esempio: */}
          {/* <SingleProjectClientDashboard clientId={clientId} /> */}
          {/* <SingleDealClientDashboard clientId={clientId} /> */}
        </>
      )}
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard;