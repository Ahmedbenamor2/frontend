 import React, { useRef } from 'react'
 import classes from './AddTaskPopup.module.css';
 import { Form, Link, useActionData, useLocation, useNavigate, useParams } from 'react-router-dom';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


 const AddTaskPopup = () => {
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const status = queryParams.get('status');
   const titleRef = useRef();
   const descRef = useRef();
   const deadlineRef = useRef();
   const params = useParams();
   const navigate=useNavigate();
   const popupRef=useRef();

   const data=useActionData();
   if(typeof data==='string'){
    console.log(data);
   }

   const clickHandler = () => {
     titleRef.current.value = '';
     descRef.current.value = '';
     deadlineRef.current.value = '';
   }

   const navigateBackHandler=(event)=>{
    if(!popupRef.current.contains(event.target)){
      navigate(`/home/projects/${params.projectId}`);
    }
   }

   return (
     <div className={classes.container} onClick={navigateBackHandler}>
       <div className={classes.popup} ref={popupRef}>
         <div className={classes.header}>
           <h2>Add new task</h2>
           <Link to={`/home/projects/${params.projectId}`}><button><FontAwesomeIcon icon="fa-solid fa-xmark" style={{ color: "#000000", }} /></button></Link>
         </div>

         <div className={classes.main}>
           <Form method='post'>
             <div>
               <label>Title:</label>
               <input type='text' name='title' ref={titleRef} required />
             </div>
             <div>
               <label>Description:</label>
               <textarea cols='33' rows='6' name='description' ref={descRef} required>
               </textarea>
             </div>
             <div>
               <label>Deadline:</label>
               <input type='date' name='deadline' ref={deadlineRef} required />
             </div>
             <div>
              <input type='text' defaultValue={status} hidden={true} name='status' />
             </div>
             <div>
               <button onClick={clickHandler}>Cancel</button>
               <button type='submit'>Add task</button>
             </div>
           </Form>
         </div>
        
       </div>
     </div>
   )
 }

export default AddTaskPopup;
