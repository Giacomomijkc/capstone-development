import React, { useEffect, useState } from 'react';
import "./ProjectDetails.css";
import Button from 'react-bootstrap/esm/Button';
import {fetchSingleProject } from '../redux/projectsSlice';
import { fetchDesignerById } from '../redux/designersSlice';
import {fetchDesignerProjects } from '../redux/projectsSlice';
import { useSelector, useDispatch } from 'react-redux';
import SingleProject from './SingleProject';

const ProjectDetails = ({project, designer}) => {

    //const designer = useSelector((state) => state.designers.singleDesigner);
    const projects = useSelector((state) => state.projects.projects);
    const designerProjects = useSelector((state) => state.projects.designerProjects);
    console.log(designerProjects)
    console.log(designer)

    const dispatch = useDispatch();

    useEffect(() => {
        if (designer && designer._id) {
            dispatch(fetchDesignerProjects(designer._id));
        }
    }, [dispatch, designer]);

    const otherDesignerProjects = designerProjects.filter((designerProject) => designerProject._id !== project._id);



  return (
    <div className='container-project'>
      {project && designer && projects && (
        <>
        <div>
            <div className='d-flex justify-content-center align-items-center mb-3'>
                <span className='me-2 project-title'>{project.title}</span>
                <span className='ms-2 tags'>
                    {project.tags.map((tag, index) => (
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
                <img src={project.cover} alt="project-cover" className='project-details-cover'/>
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
                {project.images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} className='project-image mx-3 mt-2' />
                ))}
            </div>
            <div className='d-flex justify-content-center align-items-center mt-3'>
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
                                    project={otherProject}
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