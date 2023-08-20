import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './UsersContributed.module.css';

const UsersContributed = ({id}) => {
    const [data,setData]=useState(null);
    useEffect(()=>{
        const fetchData=async ()=>{
            const response=await fetch(`http://localhost:3333/auth/${id}/get`);
            const data=await response.json();
            setData(data.name);
        };
        fetchData();
    },[]);
  return (
    <div className={classes.user} name={data} ><FontAwesomeIcon icon="fa-solid fa-user" /></div>
  )
}

export default UsersContributed;