import TaskTile from "@/components/TaskTile.tsx";
import {useAxios} from "@/contexts/AxiosContext.tsx";
import {useEffect, useState} from "react";
import {IoAddOutline} from "react-icons/io5";
import {Link} from "react-router-dom";

function Taskboard() {
    const client = useAxios();
    const [tasks, setTasks] = useState<any[]>([]);

    const getTasks = async () => {
        try {
            const response = await client.get("/api/tasks/");
            console.log(response.data);

            setTasks(response.data)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTasks().then(r => console.log(r))
    }, []);

    return (
        <>
            <div>
                {/*FIXME*/}
                Your XP & Level
            </div>
            <div className={`mb-5 flex justify-between items-center`}>
                <h1 className={`text-xl`}>
                    Taskboard
                </h1>

                <Link to={`/create-task`} className={`p-2 cursor-pointer rounded-full hover:bg-gray-100 hover:bg-opacity-80 transition`}>
                    <IoAddOutline size={30} />
                </Link>
            </div>

            {/*FIXME: Backend link*/}
            <div className={`flex flex-col gap-3`}>
                {tasks.map((task) => (
                    <TaskTile key={task.id} task={task} />
                ))}
            </div>
        </>
    );
}

export default Taskboard;
