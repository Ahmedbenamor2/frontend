import React, { useEffect, useState } from 'react'
import classes from './Tasks.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHover } from '../contexts/HoverContext';
import { useRouteLoaderData } from 'react-router-dom';
import AddProjectPopup from '../elements/AddProjectPopup';

const TasksPage = () => {
  const [user,projects]=useRouteLoaderData('home');
  const [trigger,setTrigger]=useState(false);

  const clickHandler=()=>{
    setTrigger(!trigger);
  }
 
  
  const {isHovered}=useHover();
  return (
    <>
      <div className={`${classes.container} ${isHovered ? classes.sidebarHovered : ''}`}>
        <div className={classes.addProject} onClick={clickHandler}><FontAwesomeIcon icon="fa-solid fa-circle-plus"/><p>Add project</p></div>
        {projects.map((project)=><div key={project.id} className={classes.addProject}><p>{project.title}</p></div>)}
        <AddProjectPopup trigger={trigger} onClickDropBack={clickHandler} />
      </div>
    </>
  )
}

export default TasksPage;