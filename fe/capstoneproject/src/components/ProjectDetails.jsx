import React, { useEffect } from 'react';
import "./ProjectDetails.css";
import Button from 'react-bootstrap/esm/Button';
import {fetchDesignerProjects, toggleLike } from '../redux/projectsSlice';
import { getDesignerDetails } from '../redux/usersSlice';
import { getClientDetails } from '../redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

import SingleProject from './SingleProject';

const ProjectDetails = ({project, designer}) => {

    const projects = useSelector((state) => state.projects.projects);
    const designerProjects = useSelector((state) => state.projects.designerProjects);
    const isLogged = useSelector((state)=> state.users.isLogged);
    const designerLogged = useSelector((state)=> state.users.designer);
    const clientLogged = useSelector((state)=> state.users.client);
    const likedProjects = designerLogged ? designerLogged.designer.liked_projects : clientLogged?.client.liked_projects;
    const isLiked = likedProjects?.some(likedProject => likedProject.project_id === project._id);

    console.log(designer)
    const dispatch = useDispatch();

    useEffect(() => {
        if (designer && designer._id) {
            dispatch(fetchDesignerProjects(designer._id));
        }
    }, [dispatch, designer]);

    const otherDesignerProjects = designerProjects?.filter((designerProject) => designerProject._id?.toString() !== project._id?.toString());


    const handleLikeClickBig = async() => {
        if (designerLogged) {
            await dispatch(toggleLike(project._id));
            dispatch(getDesignerDetails(designerLogged.designer._id));
          } else if (clientLogged) {
            await dispatch(toggleLike(project._id));
            dispatch(getClientDetails(clientLogged.client._id));
          }
    };


  return (
    <div className='container-project'>
      {project && designer && projects && (
        <>
        <div>
            <div className='d-flex justify-content-center align-items-center mb-3 title-tags-container'>
                <span className='me-2 project-title'>{project.title}</span>
                <span className='ms-2 tags'>
                    {project.tags?.map((tag, index) => (
                        <React.Fragment key={tag}>
                        {index > 0 && <span className='tag-separator'> | </span>}
                        {tag}
                        </React.Fragment>
                    ))}
                </span>
            </div>
        </div>
        <div>
            <div className='d-flex flex-column justify-content-center align-items-center' >
                <div className='d-flex justify-content-center align-items-center container-cover-icons'>
                    <img src={project.cover} alt="project-cover" className='project-details-cover'/>
                    {isLogged &&  (
                        <div className="vertical-icons">
                            <div className="icon-container">
                            <FontAwesomeIcon 
                            icon={isLiked ? solidHeart :regularHeart} 
                            className='mx-2 icons-project-details' 
                            onClick={handleLikeClickBig} 
                            />
                            {project.likes && (
                                <span>{project.likes.length}</span>
                            )}
                            </div>
                            <div className="icon-container">
                            <FontAwesomeIcon icon={faComment} className='mx-2 icons-project-details' />
                            {project.comments && (
                                <span>{project.comments.length}</span>
                            )}
                            </div>
                        </div>
                    )}
                </div>
                <div className='mt-2 d-flex justify-content-center align-items-center'>
                    <img src={designer.avatar} alt="designer-avatar" className='designer-avatar'/>
                    <span className='designer-nickname mx-2'>{designer.nickname}</span>
                    <span className='designer-description mx-2'>{designer.description}</span>
                </div>
            </div>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
            <div className='mb-3'>
                <span>{project.description}</span>
            </div>
            <div className='d-flex flex-wrap justify-content-center'>
                {project.images?.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} className='project-image mx-3 mt-2' />
                ))}
            </div>
            <div className='d-flex justify-content-center align-items-center mt-3 buttons-container'>
                    <Button className='button-profile mx-2'> View profile</Button>
                    <Button className='button-chat mx-2'> Open Chat</Button>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                <div>
                <span className='other-project-title'>Other Projects by <span className='designer-nickname'>{designer.nickname}</span></span>
                </div>                    
                <div className='d-flex flex-wrap justify-content-center align-items-center'>
                        {project && designer && (
                            <>
                            {otherDesignerProjects.map((otherProject) => (
                                <SingleProject
                                    key={otherProject._id}
                                    projectToRender={otherProject}
                                    authorDesigner={designer}
                                />
                                ))}
                            </>
                        )}
                </div>
            </div>
        </div>
        </>
      )}
    </div>
  )
}

export default ProjectDetails