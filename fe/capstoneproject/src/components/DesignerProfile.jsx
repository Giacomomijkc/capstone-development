import React, { useEffect } from 'react';
import SingleProject from './SingleProject';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDesignerProjects } from '../redux/projectsSlice';
import { fetchProjects } from '../redux/projectsSlice';
import DesignerProjects from './DesignerProjects';

const DesignerProfile = ({designer, designerProjects}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProjects());
      }, [dispatch, designerProjects]);
    return (
    <>
    <div className='d-flex justify-content-center align-items-center designer-info-container' >
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <img src={designer?.avatar} alt='designer avatar' className='user-avatar' />
            <span>{designer?.name} {designer?.surname}</span>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <span>Email: {designer?.email}</span>
            <span>Website: {designer?.website}</span>
            <span>Ig: {designer?.instagram}</span>
        </div>
    </div>
    <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3 title-tags-container'>
        <div>
            <span className='me-2 project-title'>{designer?.description}</span>
        </div>
        <div>
            <span className='ms-2 tags'>
                {designer?.tags?.map((tag, index) => (
                    <React.Fragment key={tag}>
                    {index > 0 && <span className='tag-separator'> | </span>}
                    {tag}
                    </React.Fragment>
                ))}
            </span>
        </div>
    </div>
    <div className='d-flex justify-content-center align-items-center'>
        {/*{designerProjects && designerProjects.map((designerProject) =>{
            return (
                <SingleProject projectToRender={designerProject} authorDesigner={designer} key={designerProject._id} />
            )
    })}*/}
    <DesignerProjects designer={designer} designerProjects={designerProjects}/>
    </div>
    </>
  )
}

export default DesignerProfile