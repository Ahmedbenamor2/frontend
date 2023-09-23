//import React, { useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import styles from './ProjectItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UsersContributed from './UsersContributed';
import { useRef,useEffect } from 'react';

//import TasksList from '../components/TasksList';

const ProjectItem = ({ id, title, description, users }) => {
  const { projectId } = useParams()
  const projectRef=useRef();

  useEffect(() => {
    if (projectId === id) {
      
      setTimeout(() => {
        projectRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    }
    }, [projectId,id]);

  

  return (
    <div className={styles.container}  ref={projectRef}>
      <div className={styles.header}>
        <h2>{title}</h2>
        
        {users.length<=2  &&  <div className={styles.users}>{users.map((userId)=><UsersContributed id={userId} key={userId} />)}</div>}
        {users.length>2 && <div className={styles.users}>{users.slice(0,2).map((userId)=><UsersContributed id={userId} key={userId} />)}<div className={styles.user}><p>{`+${users.length-2}`}</p></div></div>}
        
      </div>
      <main>
        <p>{description}</p>
      </main>
      <Link to={`/home/${id}`} ><footer><FontAwesomeIcon icon="fa-solid fa-arrow-down" /></footer></Link>
      {projectId === id && <Outlet />}
    </div>
  )
}

export default ProjectItem;
