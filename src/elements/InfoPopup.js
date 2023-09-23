import React, { useEffect } from 'react';
import  ReactDOM  from 'react-dom';
import classes from './InfoPopup.module.css';

const modalRoot=document.getElementById('modal-root');

const InfoPopup = ({isOpen,onClose,message}) => {
    useEffect(()=>{
        if(isOpen){
            const timer= setTimeout(()=>{
                onClose();
            },3000);

            return ()=>{
                clearTimeout(timer);
            }
        }
    },[isOpen,onClose])

    if(!isOpen){
        return null;
    }

  return ReactDOM.createPortal(
    <div className={classes.container}>
        <p>{message}</p>
        <div className={classes.progress_container}>
          <div className={classes.progress_bar}>
          </div>
        </div>
    </div>,modalRoot
  );
}

export default InfoPopup;