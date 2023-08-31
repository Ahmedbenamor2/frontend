import { redirect } from "react-router-dom";


export async function action({params,request}){
    const projectId=params.projectId;
    const formData=await request.formData();

    const response=await fetch(`http://localhost:3333/task/${projectId}/add`,{
        method:'POST',
        body:JSON.stringify({
            title:formData.get('title'),
            description:formData.get('description'),
            deadline:formData.get('deadline'),
            status:formData.get('status')
        }),
        headers:{'Content-Type':'application/json'}
    });
    if(!response.ok){
        return 'something went wrong!';
    }

    return redirect(`/home/projects/${projectId}`);
}