import { json, redirect } from "react-router-dom";

export async function action({ params, request }) {

    if(request.method==='PATCH'){
        const formData = await request.formData();
        const response = await fetch(`http://localhost:3333/task/${params.projectId}/${params.taskId}/edit`, {
            method: 'PATCH',
            body: JSON.stringify({
                title: formData.get('title'),
                description: formData.get('description'),
                deadline: formData.get('deadline')
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw json({ message: errorData.message }, { status: errorData.statusCode })
        }
        return redirect(`/home/projects/${params.projectId}`);
    }
    else{
        const response=await fetch(`http://localhost:3333/task/${params.projectId}/${params.taskId}/delete`,{
            method:'DELETE',
            headers:{'Content-Type':'application/json'}
        });
        if(!response.ok){
            const errorData=await response.json();
            throw json({message:errorData.message},{status:errorData.statusCode})
        }
        return redirect(`/home/projects/${params.projectId}`);
    }


}