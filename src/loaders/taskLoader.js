import { json } from "react-router-dom";

export async function loader({params,request}){
    const response=await fetch(`http://localhost:3333/task/${params.projectId}/${params.taskId}/get`);
    if(!response.ok){
        const errorData=await response.json();
        throw json({message:errorData.message},{status:errorData.statusCode});
    }

    const data=await response.json();
    return data;
}