import NavigationBar from '../components/NavigationBar';
import SingleProject from '../components/SingleProject';
import Footer from '../components/Footer';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../redux/projectsSlice';
import { fetchDesigners } from '../redux/designersSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const designers = useSelector((state) => state.designers.designers);

  useEffect(() => {
      dispatch(fetchProjects());
      dispatch(fetchDesigners())
  }, [dispatch]);
  return (
    <>
    <NavigationBar/>
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
    <Footer/>
    </>
  )
}

export default Dashboard