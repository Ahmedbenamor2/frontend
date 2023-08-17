import { Link, NavLink, Outlet } from "react-router-dom";
import classes from './Layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Layout=()=>{
    const logoutHandler=()=>{
        localStorage.removeItem('jwt');
    }
    return (
        <>
        <div className={classes.sidebar}>
            <header>Task management</header>
            <ul>
                <NavLink to='/home' className={({isActive})=>isActive ? classes.active : undefined} end><li><FontAwesomeIcon icon="fa-solid fa-house"/><span>Home</span></li></NavLink>
                <NavLink to='tasks' className={({isActive})=>isActive ? classes.active : undefined}><li><FontAwesomeIcon icon="fa-solid fa-list-check" /><span>Tasks</span></li></NavLink>
                <NavLink to='account' className={({isActive})=>isActive ? classes.active : undefined}><li><FontAwesomeIcon icon="fa-solid fa-user" /><span>Account details</span></li></NavLink>
                <Link to='/'><li style={{position:'absolute',top:'93vh'}} onClick={logoutHandler}><FontAwesomeIcon icon="fa-solid fa-power-off" /><span>Logout</span></li></Link>
            </ul>
        </div>
        <Outlet/>
        </>
    )
}

export default Layout;
