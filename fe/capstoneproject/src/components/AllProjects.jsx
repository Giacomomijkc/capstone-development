import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../redux/projectsSlice';

const AllProjects = () =>{
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>{project.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default AllProjects;