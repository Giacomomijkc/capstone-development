import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../redux/projectsSlice';
import { fetchDesigners } from '../redux/designersSlice';
import { setCurrentPage } from '../redux/projectsSlice';
import Button from "react-bootstrap/Button";
import SingleProject from './SingleProject';
import { current } from '@reduxjs/toolkit';

const AllProjects = () =>{
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.projects);
    const designers = useSelector((state) => state.designers.designers);

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchDesigners())
    }, [dispatch]);
    //PAGINATION
    //const projects = useSelector((state) => state.projects.projects);
    //const totalProjects = useSelector((state) => state.projects.totalProjects);
    //const designers = useSelector((state) => state.designers.designers);
    //const currentPage = useSelector((state) => state.projects.currentPage);

    /*useEffect(() => {
        dispatch(fetchProjects(currentPage));
        dispatch(fetchDesigners());
    }, [dispatch, currentPage]);*/

    return (
        <div>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
            {designers && projects &&
            projects.map((project) => {
                const authorDesigner = designers.find(
                    (designer) => designer._id === project.author
                  );
                return (
                    <SingleProject key={project._id} projectToRender={project} authorDesigner={authorDesigner} />
                );
                })
            }
            </div>
        </div>
        /* PAGINATION
        <div>
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                {designers && projects &&
                projects.map((project) => {
                    const authorDesigner = designers.find(
                        (designer) => designer._id === project.author
                    );
                    return (
                        <SingleProject key={project._id} projectToRender={project} authorDesigner={authorDesigner} />
                    );
                })}
            </div>
            <div className="pagination">
                {Array.from({length: totalProjects}, (_, index)=> (
                    <Button
                    key={index + 1}
                    onClick={() => dispatch(setCurrentPage(index + 1))}
                    active={index + 1 === currentPage}
                  >
                    {index + 1}
                  </Button>
                ))}
            </div>
        </div>*/
    );
}

export default AllProjects;