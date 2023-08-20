//import jwtDecode from 'jwt-decode';
import {  useRouteLoaderData } from 'react-router-dom';
//import TaskItem from '../elements/TaskItem';
import styles from './Home.module.css';
import ProjectItem from '../elements/ProjectItem';


const HomePage = () => {
    const data = useRouteLoaderData('home');
    const { name } = data[0];
    let projectsComponent;

    if (data[1].statusCode === 404) {
        projectsComponent = <p>{data[1].message}</p>
    }
    else {
        projectsComponent = <ul className={styles.ul}> 
            {data[1].map((project) => <li key={project.id}><ProjectItem id={project.id} title={project.title} description={project.description} users={project.users} /></li>)}
        </ul>
    }
    return (

        <>
            <h1>Welcome to your profile!</h1>
            <h2 style={{ color: '#0047AB', textAlign: 'center' }}>{name}</h2>
            {projectsComponent}
        </>
    )
}

export default HomePage;

