import React from 'react'
import classes from './ProjectElt.module.css';

const ProjectElt = (props) => {
  return (
    <div className={classes.addProject}>
        {props.children}
    </div>
  )
}

export default ProjectElt