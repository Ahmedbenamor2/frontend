import jwtDecode from 'jwt-decode';
import { json, useRouteLoaderData } from 'react-router-dom';
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
            {data[1].map((project) => <li key={project.id}><ProjectItem id={project.id} title={project.title} description={project.description}/></li>)}
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

export async function loader() {
    const res = [];
    const jwt = localStorage.getItem('jwt');
    const decodedJwt = jwtDecode(jwt);
    const response = await fetch(`http://localhost:3333/auth/${decodedJwt.userId}/get`);

    if (!response.ok) {
        throw json({ message: 'Could not find user' }, { status: 505 })
    }
    else {
        const data = await response.json();
        res.push(data);
        const projectResponse = await fetch(`http://localhost:3333/project/${decodedJwt.userId}/get`);
        if (!projectResponse.ok) {
            const error = await projectResponse.json();
            res.push(error);
        }
        else {
            const projectData = await projectResponse.json();
            res.push(projectData);

        }
    }
    return res;
}
