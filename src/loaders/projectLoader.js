import jwtDecode from "jwt-decode";
import { json } from "react-router-dom";

export async function loader({params,request}){
    const projectId=params.projectId;
    const jwt=localStorage.getItem('jwt');
    const userId=jwtDecode(jwt).userId;

    const response=await fetch(`http://localhost:3333/project/${userId}/${projectId}/get`);
    if(!response.ok){
        const data=await response.json();
        throw json({message:data.message},{status:data.statusCode});
    }

    const data=await response.json();
    const Tasksresponse = await fetch(`http://localhost:3333/task/${projectId}/get`);
    if(!Tasksresponse.ok){
        data.tasks=[];
        return data;
    }
    const tasksData=await Tasksresponse.json();
    data['tasks']=tasksData;
    return data;

}