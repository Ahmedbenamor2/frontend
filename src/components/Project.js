import React, { useEffect, useState,useRef } from 'react'
import classes from './Project.module.css';
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';
import UsersContributed from '../elements/UsersContributed';
import { useHover } from '../contexts/HoverContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwtDecode from 'jwt-decode';


const ProjectPage = () => {
  const projectData = useLoaderData();
  const { isHovered } = useHover();
  const [tasksData, setTasksData] = useState(null);
  const params = useParams();
  const [isDisabled,setIsDisabled]=useState(true);
  const descriptionRef=useRef();

  useEffect(() => {
    async function getTasks() {
      const response = await fetch(`http://localhost:3333/task/${params.projectId}/get`);
      if (!response.ok) {
        setTasksData(null);
      }
      else {
        const data = await response.json();
        setTasksData(data);
      }
    }
    getTasks();
  });

  useEffect(()=>{
    if(!isDisabled){
      descriptionRef.current.focus();
    }
  },[isDisabled]);

  function addList(status) {
    return tasksData.filter((task) => task.status === status).map((task) => <li key={task.id}>
      <div>
        <h3>{task.title}</h3>
        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
      </div>
    </li>)
  }

  const editDescription=()=>{
    setIsDisabled(false);
  }

  const updateData=async()=>{
    const jwt=localStorage.getItem('jwt');
    const userId=jwtDecode(jwt).userId;
    const response=await fetch(`http://localhost:3333/project/${userId}/${params.projectId}/edit`,{
      method:'PATCH',
      body:JSON.stringify({
        title:projectData.title,
        description:descriptionRef.current.value
      }),
      headers:{'Content-Type':'application/json'}
    })

    if(!response.ok){
      console.log('an error occured!');
    }

    const data=await response.text();
    console.log(data);
    setIsDisabled(true);
  }

  return (
    <>
      <div className={`${classes.container} ${isHovered ? classes.isHovered : ''}`}>
        <div className={classes.projectDetails}>
          <div>
            <h1>{projectData.title}</h1>
            <input type='text' defaultValue={projectData.description} disabled={isDisabled} style={{border:'none'}} ref={descriptionRef} />
            {isDisabled?<FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{color: "#a8a8a8"}} onClick={editDescription} />:<FontAwesomeIcon icon="fa-regular fa-square-check" style={{color: "#a8a8a8"}} onClick={updateData} />}
            <div className={classes.creator}>
              <p><strong>created by:</strong></p>
              <UsersContributed id={projectData.users[0]} />
            </div>
          </div>
          <div className={classes.contributors}>
            <p><strong>users contributed:</strong></p>
            <ul>{projectData.users.map((user, index) => (<li><UsersContributed key={index} id={user} /></li>))}</ul>
          </div>
        </div>
        <div className={classes.tasks}>
          <div className={classes.tasksContainer} id='To-do'>
            <h2>To-do</h2>
            <ul>
              {(tasksData && tasksData.filter((task) => task.status === 'To-do')) ? addList('To-do') : ''}
              <Link to={{pathname:`/home/projects/${params.projectId}/add`,search:'?status=To-do'}}><li><div><FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#000000", }} /><p>Add task</p></div></li></Link>
            </ul>
          </div>
          <div className={classes.tasksContainer} id='In progress'>
            <h2>In progress</h2>
            <ul>
              {(tasksData && tasksData.filter((task) => task.status === 'In progress')) ? addList('In progress') : ''}
              <li><div><FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#000000", }} /><p>Add task</p></div></li>
            </ul>
          </div>
          <div className={classes.tasksContainer} id='Completed'>
            <h2>Completed</h2>
            <ul>
              {(tasksData && tasksData.filter((task) => task.status === 'Completed')) ? addList('Completed') : ''}
              <li><div><FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#000000", }} /><p>Add task</p></div></li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default ProjectPage;