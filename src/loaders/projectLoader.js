import jwtDecode from "jwt-decode";

export async function loader({params,request}){
    const projectId=params.projectId;
    const jwt=localStorage.getItem('jwt');
    const userId=jwtDecode(jwt).userId;

    const response=await fetch(`http://localhost:3333/project/${userId}/${projectId}/get`);
    if(!response.ok){
        const data=await response.json();
        return data.message;
    }

    const data=await response.json();
    return data;

}