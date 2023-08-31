import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";


export async function action({ request, params }) {
    
    const data = await request.formData();
    const encodedId = localStorage.getItem('jwt');
    const decodedId = jwtDecode(encodedId);
    const response = await fetch(`http://localhost:3333/project/${decodedId.userId}/add`, {
        method: 'POST',
        body: JSON.stringify({
            title: data.get('title'),
            description: data.get('description')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if(!response.ok){
        const errorMessage=await response.json();
        return errorMessage.message;
    }

    
    const responseData=await response.json();
    return redirect(`/home/projects/${responseData._id}`);;
}

