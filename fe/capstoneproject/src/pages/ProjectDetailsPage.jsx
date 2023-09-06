import React, {useEffect} from 'react';
import ProjectDetails from '../components/ProjectDetails';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { fetchSingleProject} from '../redux/projectsSlice';
import { fetchDesignerById } from '../redux/designersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProjectDetailsPage = () => {

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.singleProject);
  const designer = useSelector((state) => state.designers.singleDesigner);

  console.log(project)
  console.log(designer)

  useEffect(() => {
    dispatch(fetchSingleProject(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (project && project.author) {
      dispatch(fetchDesignerById(project.author));
    }
  }, [dispatch, project]);




  return (
    <>
    <NavigationBar/>
    <ProjectDetails 
    project={project}
    designer={designer}
    />
    <Footer/>
    </>
  )
}

export default ProjectDetailsPage