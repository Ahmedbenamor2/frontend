import "./App.css";
import FirstPage from "./components/FirstPage";
import HomePage from "./components/Home";
import Layout from "./components/Layout";
import Login, { action as loginAction } from "./login/Login";
import Signup, { action as signUpAction } from "./login/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import TasksPage from "./components/Tasks";
import AccountDetails from "./components/AccountDetails";
import TasksList from "./components/TasksList";
import {loader as tasksLoader} from "./components/TasksList"
import { loader as homeLoader } from "./loaders/homeLoader";

const router = createBrowserRouter([
  {
    path: "/", children: [
      { index: true, element: <FirstPage /> },
      { path: "login", element: <Login />, action: loginAction },
      { path: "signup", element: <Signup />, action: signUpAction },
      {
        path: "home", element: <Layout />, loader: homeLoader, id: 'home', children: [
          { path:"", element: <HomePage /> ,children:[
            {path:":projectId", element:<TasksList/>,loader:tasksLoader,id:'task-data'}
          ]},
          {
            path: "tasks", element: <TasksPage />/*, children: [
              { path: ":projectId", element: <TasksList /> ,loader:tasksLoader,id:'task-data'}
            ]*/
          },
          { path: "account", element: <AccountDetails /> },

        ]
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
library.add(fab, fas, far);
