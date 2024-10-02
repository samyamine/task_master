import TaskTile from "@/components/TaskTile.tsx";
import {useAxios} from "@/contexts/AxiosContext.tsx";
import {useEffect, useState} from "react";
import {IoAddOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import {getTasks} from "@/lib/utils.ts";

function Taskboard() {
    const client = useAxios();
    const [tasks, setTasks] = useState<any[]>([]);

    const initTasks = async () => {
        const data = await getTasks(client);
        setTasks(data);
    };

    useEffect(() => {
        initTasks().then(r => console.log(r));
    }, []);

    return (
        <>
            <div className={`mb-5 flex justify-between items-center`}>
                <h1 className={`text-xl`}>
                    Taskboard
                </h1>

                <Link to={`/create-task`} className={`p-2 cursor-pointer rounded-full hover:bg-gray-100 hover:bg-opacity-80 transition`}>
                    <IoAddOutline size={30} />
                </Link>
            </div>

            <div className={`flex flex-col gap-3`}>
                {tasks.map((task) => (
                    <TaskTile key={task.id} task={task} />
                ))}
            </div>
        </>
    );
}

export default Taskboard;
