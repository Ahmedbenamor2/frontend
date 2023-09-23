import jwtDecode from "jwt-decode";
import { redirect,json } from "react-router-dom";

export async function action({params,request}){
    const jwt=localStorage.getItem('jwt');
    const currentUser=jwtDecode(jwt).userId;
    const response = await fetch(`http://localhost:3333/project/${currentUser}/${params.projectId}/delete`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if(!response.ok){
        throw json({message:'An error occured'},{status:403});
      }
      return redirect('/home/projects');
}