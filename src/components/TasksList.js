import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import TaskItem from '../elements/TaskItem'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './TasksList.module.css';

const TasksList = () => {
    const data = useRouteLoaderData('task-data');
    if (data.statusCode) {
        return <><p style={{ color: 'red' }}>{data.message}</p><Link to='/home'><span><FontAwesomeIcon icon="fa-solid fa-xmark" /></span></Link></>;
    }
    return (
        <>
            <ul className={classes.ul}>
                {data.map((task) => <li key={task.id}>{<TaskItem title={task.title} description={task.description} deadline={task.deadline} />}</li>)}
            </ul>
            <Link to='/home'><span><FontAwesomeIcon icon="fa-solid fa-xmark" /></span></Link>
        </>
    )
}

export default TasksList

export async function loader({ params, request }) {
    const projectId = params.projectId;
    const response = await fetch(`http://localhost:3333/task/${projectId}/get`);
    const data = await response.json();
    return data;
}