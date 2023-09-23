import React from 'react';
import classes from './TasksClassificationList.module.css';
import { Droppable,Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';

const TasksClassificationList = ({tasks,status}) => {
    const params=useParams();
    return (
        <div className={classes.tasksContainer} id={status}>
            <h2>{status}</h2>
            <Droppable droppableId={status}>
                {(provided) => (
                    <ul className='tasks' {...provided.droppableProps} ref={provided.innerRef}>
                        {(tasks && tasks.filter((task) => task.status === `${status}`)) ? tasks.filter((task) => task.status === `${status}`).map((task, index) =>
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Link to={`/home/projects/${params.projectId}/${task.id}`}>
                                        <div>
                                            <h3>{task.title}</h3>
                                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" className={classes.icon} />
                                        </div>
                                        </Link>
                                    </li>)}
                            </Draggable>) : ''}
                        {provided.placeholder}
                        <Link to={{ pathname: `/home/projects/${params.projectId}/add`, search: `?status=${status}` }}><li><div><FontAwesomeIcon icon="fa-solid fa-plus" style={{ color: "#000000", }} /><p>Add task</p></div></li></Link>
                    </ul>)}
            </Droppable>

        </div>
    )
}

export default TasksClassificationList;