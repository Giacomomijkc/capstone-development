import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SingleProject from './SingleProject';
import {fetchDesignerProjects } from '../redux/projectsSlice';

const OtherDesignerProjects = ({projectId, designerId}) => {

    const dispatch = useDispatch();

    const designerProjects = useSelector((state) => state.projects.designerProjects);

    useEffect(() => {
            dispatch(fetchDesignerProjects(designerId));
            console.log("eseguo fetchDesignerProjects ")
        //con designerProjects nell'array contiua a eseguire la chiamata, ma se lo tolgo non aggiorno i likes
    }, [dispatch, designerProjects ]);

    /*const otherProjects =*/ designerProjects.filter(
        (project) => project._id !== projectId
      );
  return (
<div>
      {designerProjects.map((project) => (
        <SingleProject
          key={project._id}
          projectToRender={project}
          authorDesigner={designerId}
        />
      ))}
    </div>
  )
}

export default OtherDesignerProjects