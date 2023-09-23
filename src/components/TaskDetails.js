import React, { useEffect } from 'react';
import classes from './TaskDetails.module.css';
import { Form, Link, useLoaderData, useNavigation, useParams, useSubmit } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInfo } from '../contexts/InfoContext';

const TaskDetails = () => {
  const params=useParams();
  const taskData=useLoaderData();
  const deadlineDate=new Date(Date.parse(taskData.deadline));
  const submit=useSubmit();
  const{openModal,setMessage}=useInfo();
  const navigation=useNavigation();
  
  useEffect(() => {
    const main = document.getElementById('project_div');
    main.style.overflow = 'hidden';
  }, []);

  const deleteTask=()=>{
    const confirm=window.confirm('Are you sure you want to delete this task?');
    if(confirm){
      setMessage('Task deleted!');
      openModal();
      submit(null,{method:'delete'});
    }
  }

  const updateHandler=()=>{
    if(navigation.state!=='submitting'){
      setMessage('Task updated successfully!');
      openModal();
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.details_popup}>
        <div className={classes.header}>
          <h2>Task details</h2>
          <Link to={`/home/projects/${params.projectId}`}><button><FontAwesomeIcon icon="fa-solid fa-xmark" style={{color: "#000000",}} /></button></Link>
        </div>
        <div className={classes.main}>
          <Form method='patch'>
            <div className={classes.form_elt}>
              <label>Title</label>
              <input type='text' name='title' defaultValue={taskData.title} />
            </div>
            <div className={classes.form_elt}>
              <label>Description</label>
              <textarea cols='33' rows='6' name='description' defaultValue={taskData.description}>
              </textarea>
            </div>
            <div className={classes.form_elt}>
              <label>Deadline</label>
              <input type='date' name='deadline' defaultValue={`${deadlineDate.getFullYear()}-${(deadlineDate.getMonth() + 1).toString().padStart(2, '0')}-${deadlineDate.getDate().toString().padStart(2, '0')}`} disabled={deadlineDate<Date.now()} />
            </div>
            <div className={classes.submit}>
              <button type='button' onClick={deleteTask}>{navigation.state==='Deleting...'?'Submitting...':'Delete'}</button>
              <button type='submit' onClick={updateHandler} disabled={navigation.state==='submitting'}>{navigation.state==='submitting'?'Submitting...':'Submit'}</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails;