import jwtDecode from "jwt-decode";
import { json } from "react-router-dom";

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
