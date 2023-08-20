import React from 'react';
import classes from './TaskItem.module.css';

const TaskItem = ({ title, description, deadline }) => {

  const deadlineDate = new Date(Date.parse(deadline));

  const current = new Date();
  let remainingTime = '';
  const remainingTimeInMilisecondes = deadlineDate.getTime() - current.getTime();
  if (remainingTimeInMilisecondes <= 0) {
    remainingTime = 'Deadline exceeded!'
  }
  else {
    const remainingTimeInMinutes = Math.floor((remainingTimeInMilisecondes / 1000) / 60);
    if (remainingTimeInMinutes < 60) {
      remainingTime = `${remainingTimeInMinutes} minute${remainingTimeInMinutes > 1 ? 's' : ''}  left...`;
    }
    else {
      const remainingTimeInHours = Math.floor(remainingTimeInMinutes / 60);
      if (remainingTimeInHours < 24) {
        remainingTime = `${remainingTimeInHours} hour${remainingTimeInHours > 1 ? 's' : ''}  left...`;
      }
      else {
        const remainingTimeInDays = Math.floor(remainingTimeInHours / 24);
        if (remainingTimeInDays < 7) {
          remainingTime = `${remainingTimeInDays} day${remainingTimeInDays > 1 ? 's' : ''}  left...`;
        }
        else {
          const remainingInWeeks = Math.floor(remainingTimeInDays / 7);
          if (remainingInWeeks < 4) {
            remainingTime = `${remainingInWeeks} week${remainingInWeeks > 1 ? 's' : ''}  left...`;
          }
          else {
            const remainingTimeInMonths = Math.floor(remainingInWeeks / 4);
            remainingTime = `${remainingTimeInMonths} month${remainingTimeInMonths > 1 ? 's' : ''}  left...`;
          }
        }
      }
    }
  }
  return (
    <div className={classes.container}>
      <header>
        <h2>{title}</h2>
      </header>
      <main>
        <p><strong>Description: </strong>{description}</p>
        <p>{deadlineDate.toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <p style={remainingTimeInMilisecondes > 86400000 ? { color: 'gray' } : { color: '#8B0000' }}>{`${remainingTime}`}</p>

      </main>
    </div>
  )
}

export default TaskItem;