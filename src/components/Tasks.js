import classes from './Tasks.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHover } from '../contexts/HoverContext';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useState } from 'react';
import AddProjectPopup from '../elements/AddProjectPopup';


const TasksPage = () => {
  const [user, projects] = useRouteLoaderData('home');
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();



  const clickHandler = (id) => {
    navigate(`/home/projects/${id}`);
  }

  const addProjectHandler = () => {
    setTrigger(!trigger);
  }

  const { isHovered } = useHover();
  return (
    <>
      <div className={`${classes.container} ${isHovered ? classes.sidebarHovered : ''}`}>
        <div className={classes.addProject} onClick={addProjectHandler}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /><p>Add project</p></div>
        {projects.map((project) => <div key={project.id} className={classes.addProject} onClick={() => clickHandler(project.id)}><p>{project.title}</p></div>)}
        <AddProjectPopup trigger={trigger} onClosePopup={addProjectHandler} />
      </div>
    </>
  )
}

export default TasksPage;