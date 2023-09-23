//import jwtDecode from 'jwt-decode';
import { useRouteLoaderData } from 'react-router-dom';
//import TaskItem from '../elements/TaskItem';
import styles from './Home.module.css';
import ProjectItem from '../elements/ProjectItem';
import { useEffect } from 'react';


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

    useEffect(() => {
        const url=window.location.href;
        const items = document.querySelectorAll(`.${styles.ul} li`);
        let delay=0;
        for (let i = 0; i < items.length; i++) {
            items[i].style.transform = 'translate(0,0)';
            if(url==="http://localhost:3000/home"){
                items[i].style.transition='1s ease';
                items[i].style.transitionDelay=`${delay}s`;
                delay+=.5;
            }
        }
    }, [])


    return (

        <>
            <div className={styles.container}>
                <h1>{`Welcome Back ${name}`}</h1>
                
                {projectsComponent}
            </div>
        </>
    )
}

export default HomePage;

