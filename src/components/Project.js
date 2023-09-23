import React, { useEffect, useState, useRef } from 'react'
import classes from './Project.module.css';
import {  Outlet, useLoaderData, useParams, useSubmit } from 'react-router-dom';
import UsersContributed from '../elements/UsersContributed';
import { useHover } from '../contexts/HoverContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwtDecode from 'jwt-decode';
import { DragDropContext } from 'react-beautiful-dnd';
import TasksClassificationList from '../elements/TasksClassificationList';
import { useInfo } from '../contexts/InfoContext';


const ProjectPage = () => {

  const projectData = useLoaderData();
  const { isHovered } = useHover();
  const params = useParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const descriptionRef = useRef();
  const titleRef = useRef();
  const submit=useSubmit();
  const jwt = localStorage.getItem('jwt');
  const currentUser = jwtDecode(jwt).userId;

  useEffect(()=>{
    const main=document.getElementById('project_div');
    main.style.overflow='auto';
  });
  
  useEffect(() => {
    if (!isDisabled) {
      descriptionRef.current.focus();
      titleRef.current.focus();
    }
  }, [isDisabled]);


  const editTask = () => {
    if (currentUser === projectData.users[0]) {
      setIsDisabled(false);
    }
    else {

    }
  }

  const updateData = async () => {
    const response = await fetch(`http://localhost:3333/project/${currentUser}/${params.projectId}/edit`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: titleRef.current.value,
        description: descriptionRef.current.value
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
      console.log('an error occured!');
    }

    const data = await response.text();
    setIsDisabled(true);
  }

  const dragEndHandler = async (result) => {
    const draggedTask = projectData.tasks.filter((task) => task.id === result.draggableId)[0];
    const deadlineDate = new Date(draggedTask.deadline);
    draggedTask.status = result.destination.droppableId;

    const response = await fetch(`http://localhost:3333/task/${params.projectId}/${draggedTask.id}/edit`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: draggedTask.title,
        description: draggedTask.description,
        deadline: `${deadlineDate.getFullYear()}-${(deadlineDate.getMonth() + 1).toString().padStart(2, '0')}-${deadlineDate.getDate().toString().padStart(2, '0')}`,
        status: result.destination.droppableId
      }),
      headers: { 'Content-type': 'application/json' }
    });
    if (!response.ok) {
      console.log('an error occured!');
    }
    const data = await response.text();
  }

  const { openModal,setMessage } = useInfo();
  
  const deleteProjectHandler = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this project?');
    if (confirmation) {
      submit(null,{method:'delete'});
      setMessage('Project deleted successfully!');
      openModal();
    }
  }

  

  return (
    <>
      <div className={`${classes.container} ${isHovered ? classes.isHovered : ''}`} id='project_div'>
        <div className={classes.projectDetails}>
          <div>
            <input type='text' defaultValue={projectData.title} disabled={isDisabled} style={{ border: 'none' }} ref={titleRef} />
            <textarea type='text' defaultValue={projectData.description} disabled={isDisabled} style={{ border: 'none', resize: 'none' }} ref={descriptionRef} cols='40' rows='3' />
            {isDisabled ? <div className={currentUser === projectData.users[0] ? classes.admin : classes.member}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" style={{ color: "#a8a8a8" }} onClick={editTask} /></div> : <div><FontAwesomeIcon icon="fa-regular fa-square-check" style={{ color: "#a8a8a8", cursor: 'pointer' }} onClick={updateData} /></div>}
            <div className={classes.creator}>
              <p><strong>created by:</strong></p>
              <UsersContributed id={projectData.users[0]} />
            </div>
          </div>
          <div className={classes.contributors}>
            <p><strong>users contributed:</strong></p>
            <ul>{projectData.users.map((user, index) => (<li><UsersContributed key={user} id={user} /></li>))}</ul>
          </div>
        </div>
        <DragDropContext onDragEnd={dragEndHandler}>
          <div className={classes.tasks}>
            <TasksClassificationList tasks={projectData.tasks} status='To-do' />
            <TasksClassificationList tasks={projectData.tasks} status={'In progress'} />
            <TasksClassificationList tasks={projectData.tasks} status={'Completed'} />
          </div>
        </DragDropContext>
        <button className={classes.delete_project} onClick={deleteProjectHandler}>Delete project</button>
      </div>
      <Outlet />
    </>
  )
}

export default ProjectPage;