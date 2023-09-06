import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../redux/projectsSlice';
import { fetchDesigners } from '../redux/designersSlice';
import SingleProject from './SingleProject';

const AllProjects = () =>{
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const designers = useSelector((state) => state.designers.designers);

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchDesigners())
    }, [dispatch]);

    console.log(designers)
    console.log(projects)
    return (
        <div>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                {designers && projects &&
                projects.map((project) => {
                    // Ottieni il designer corrispondente in base all'ID dell'autore
                    const authorDesigner = designers.find(
                        (designer) => designer._id === project.author
                      );
                    console.log(authorDesigner)
    
                    return (
                        <SingleProject key={project._id} project={project} authorDesigner={authorDesigner} />
                    );
                    })
                }
            </div>
        </div>
    );
}

export default AllProjects;