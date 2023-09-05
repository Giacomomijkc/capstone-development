import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../redux/projectsSlice';
import { fetchDesigners } from '../redux/designersSlice';
import SingleProject from './SingleProject';

const AllProjects = () =>{
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects);
    const designers = useSelector((state) => state.designers.designers);

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchDesigners())
    }, [dispatch]);

    console.log(designers)
    return (
        <div>
            <h1>Projects</h1>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                {projects.map((project) => {
                // Ottieni il designer corrispondente in base all'ID dell'autore
                const authorDesigner = designers.find(
                    (designer) => designer._id === project.author
                  );
                console.log(authorDesigner)

                return (
                    <SingleProject key={project._id} project={project} authorDesigner={authorDesigner} />
                );
                })}
      </div>
        </div>
    );
}

export default AllProjects;