import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import TaskBoard from "@/pages/TaskBoard.tsx";
import Task from "@/pages/Task.tsx";
import CreateTask from "@/pages/CreateTask.tsx";
import CreateQuest from "@/pages/CreateQuest.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "taskboard/",
                element: <TaskBoard />,
            },
            {
                path: "create-task/",
                element: <CreateTask />,
            },
            {
                path: "create-quest/",
                element: <CreateQuest />,
            },
            {
                path: "task/:id",
                element: <Task />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
