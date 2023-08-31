import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import TaskItem from '../elements/TaskItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './TasksList.module.css';

const TasksList = () => {
    const data = useRouteLoaderData('task-data');
    
    if (data.statusCode) {
        return <><p style={{ color: 'red' }}>{data.message}</p><Link to='/home'><span><FontAwesomeIcon icon="fa-solid fa-xmark" /></span></Link></>;
    }
    return (
        <>
            <div className={classes.container}>
                <div className={classes.filterByStatus}>
                    <h2>To-do</h2>
                    <ul></ul>
            { <ul className={classes.ul}>
                {data.filter((task)=>task.status==='To-do').map((task) => <li key={task.id}>{<TaskItem title={task.title} description={task.description} deadline={task.deadline} />}</li>)}
            </ul> }
                </div>
                <div className={classes.filterByStatus}>
                    <h2>In progress</h2>
                    <ul className={classes.ul}>
                {data.filter((task)=>task.status==='In progress').map((task) => <li key={task.id}>{<TaskItem title={task.title} description={task.description} deadline={task.deadline} />}</li>)}
                    </ul>
                </div>
                <div className={classes.filterByStatus}>
                    <h2>Completed</h2>
                    {data.filter((task)=>task.status==='Completed').length===0 && <p>No completed tasks!</p>}
                    <ul className={classes.ul}>
                {data.filter((task)=>task.status==='Completed').map((task) => <li key={task.id}>{<TaskItem title={task.title} description={task.description} deadline={task.deadline} />}</li>)}
                    </ul>
                </div>
            </div>
            <Link to='/home'><span><FontAwesomeIcon icon="fa-solid fa-xmark" /></span></Link>
        </>
    )
}

export default TasksList

