export async function loader({ params, request }) {
    const projectId = params.projectId;
    const response = await fetch(`http://localhost:3333/task/${projectId}/get`);
    const data = await response.json();
    return data;
}