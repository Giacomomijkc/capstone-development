import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDesignerProjects } from '../redux/projectsSlice';
import SingleProject from './SingleProject';

const DesignerProjects = ({ designer, designerProjects }) => {
  

  const dispatch = useDispatch();
  //const designerProjects = useSelector((state) => state.projects.designerProjects);

  /*useEffect(() => {
    dispatch(fetchDesignerProjects(designer?._id));
  }, [dispatch]);*/

  return (
    <div>
      <div className='d-flex flex-wrap justify-content-center align-items-center'>
        {designerProjects.length > 0 ? (
          designerProjects.map((project) => (
            <SingleProject
              key={project._id}
              projectToRender={project}
              authorDesigner={designer } // Pass designer's ID as author
            />
          ))
        ) : (
          <p>No other projects found</p>
        )}
      </div>
    </div>
  );
};

export default DesignerProjects;
