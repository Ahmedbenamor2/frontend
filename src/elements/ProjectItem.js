//import React, { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import styles from './ProjectItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import TasksList from '../components/TasksList';

const ProjectItem = (props) => {
    const {projectId}=useParams()
    
    
  return (
    <div className={styles.container}>
        <header>
            <h2>{props.title}</h2>
        </header>
        <main>
            <p>{props.description}</p>
        </main>
        <Link to={`/home/${props.id}`}><footer><FontAwesomeIcon icon="fa-solid fa-arrow-down" /></footer></Link>
        {projectId===props.id && <Outlet/>}
    </div>
  )
}

export default ProjectItem;

export async function loader(){
    
}