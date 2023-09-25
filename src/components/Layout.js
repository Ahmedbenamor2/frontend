import { Link, NavLink, Outlet } from "react-router-dom";
import classes from './Layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHover } from "../contexts/HoverContext";

const Layout=()=>{
    const logoutHandler=()=>{
        localStorage.removeItem('jwt');
    }
    const {handleHover, handleMouseLeave } = useHover();
    return (
        <>
        <Outlet/>
        <div className={classes.sidebar} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            <header>Task management</header>
            <ul>
                <NavLink to='/home' className={({isActive})=>isActive ? classes.active : undefined} end><li><FontAwesomeIcon icon="fa-solid fa-house"/><span>Home</span></li></NavLink>
                <NavLink to='projects' className={({isActive})=>isActive ? classes.active : undefined}><li><FontAwesomeIcon icon="fa-solid fa-list-check" /><span>Projects</span></li></NavLink>
                <NavLink to='account' className={({isActive})=>isActive ? classes.active : undefined}><li><FontAwesomeIcon icon="fa-solid fa-user" /><span>Account details</span></li></NavLink>
                <Link to='/'><li onClick={logoutHandler}><FontAwesomeIcon icon="fa-solid fa-power-off" /><span>Logout</span></li></Link>
            </ul>
        </div>
        </>
    )
}

export default Layout;
