import React from 'react'
import { useRouteError } from 'react-router-dom';
import classes from './Error.module.css';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className={classes.container}>
            <span>{error.status || 404}</span>
            <p>{error.data.message}</p>
        </div>
    )
}

export default ErrorPage;