import React, { useState } from 'react'
import classes from './AddProjectPopup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddProjectPopup = (props) => {
    
    return props.trigger ? (
        <div className={classes.popup} onClick={props.onClickDropBack}>
            <div className={classes.popupInner}>
                    <button onClick={props.onClickDropBack}><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
                    <h4>Add a new project</h4>
                    <p>hi!</p>
                    <p>hello there!</p>
                    <p>hhhh</p>
                    <p>papapapapa</p>
            </div>
        </div>
    ) : ''
}

export default AddProjectPopup