import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createHashRouter, Navigate, RouterProvider} from "react-router-dom";
import TaskBoard from "@/pages/TaskBoard.tsx";
import Task from "@/pages/Task.tsx";
import CreateTask from "@/pages/CreateTask.tsx";
import CreateQuest from "@/pages/CreateQuest.tsx";
import QuestBoard from "@/pages/QuestBoard.tsx";
import {AxiosProvider} from "@/contexts/AxiosContext.tsx";
import Quest from "@/pages/Quest.tsx";
import Rewards from "@/pages/Rewards.tsx";
import Dashboard from "@/pages/Dashboard.tsx";


const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: "dashboard/",
                element: <Dashboard />,
            },
            {
                path: "taskboard/",
                element: <TaskBoard />,
            },
            {
                path: "questboard/",
                element: <QuestBoard />,
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
            {
                path: "quest/:id",
                element: <Quest />,
            },

            {
                path: "rewards/",
                element: <Rewards />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <div>
        <StrictMode>
            <AxiosProvider>
                <RouterProvider router={router} />
            </AxiosProvider>
        </StrictMode>,
    </div>
);
