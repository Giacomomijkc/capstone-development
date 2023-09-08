import React, { useEffect } from 'react';
import './SingleProject.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
//import {toggleLike } from '../redux/projectsSlice';
import { toggleSingleProjectLike } from '../redux/projectsSlice';
import { fetchProjects } from '../redux/projectsSlice';
import { getDesignerDetails } from '../redux/usersSlice';
import { getClientDetails } from '../redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';  

const SingleProject = ({projectToRender, authorDesigner}) => {

  const isLogged = useSelector((state)=> state.users.isLogged);
  const designerLogged = useSelector((state)=> state.users.designer);
  const clientLogged = useSelector((state)=> state.users.client);
  const likedProjects = designerLogged ? designerLogged.designer.liked_projects : clientLogged?.client.liked_projects;
  const isLiked = likedProjects?.some(likedProject => likedProject.project_id === projectToRender._id);

  const dispatch = useDispatch();

  const handleLikeClick = async() => {
    if (designerLogged) {
        console.log("ho cliccato")
        await dispatch(toggleSingleProjectLike(projectToRender._id));
        console.log('ho eseguito tooggle')
        dispatch(getDesignerDetails(designerLogged.designer._id));
        console.log('ho eseguito getDesignerDetails')
        dispatch(fetchProjects());
        console.log('ho eseguito fetchProjects')
      } else if (clientLogged) {
        await dispatch(toggleSingleProjectLike(projectToRender._id));
        dispatch(getClientDetails(clientLogged.client._id));
        dispatch(fetchProjects());
      }
  };

  return (
    <>
    <div className='d-flex flex-column my-5 mx-2' style={{ width: '250px' }}>
      <Link to={`projects/${projectToRender._id}`}>
        <img className='project-cover' alt='project-cover' src={projectToRender.cover} />
      </Link>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='mt-2'>
                {authorDesigner && (
                <>
                <Link to={`/designers/${authorDesigner._id}`}>
                  <img className='author-avatar mx-2' alt="Author Avatar" src={authorDesigner.avatar} />
                </Link>
                <span className='author-nickname mx-2'>{authorDesigner.nickname}</span>
                </>
            )} 
            </div>
            {isLogged && (
              <div className='mt-2'>
                <span className='project-like'><FontAwesomeIcon icon={isLiked ? solidHeart :regularHeart} className='mx-2 icons' onClick={handleLikeClick}/>{projectToRender.likes?.length}</span>
                <span className='project-comment'> <FontAwesomeIcon icon={faComment} className='mx-2 icons' />{projectToRender.comments?.length}</span>
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default SingleProject