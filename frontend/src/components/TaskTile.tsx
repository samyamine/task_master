import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {FaArrowRotateLeft, FaCheck} from "react-icons/fa6";
import {MdDelete, MdModeEdit} from "react-icons/md";
import {Link} from "react-router-dom";
import DifficultyBadge from "@/components/DifficultyBadge.tsx";
import {deleteTask, updateTask} from "@/lib/utils.ts";
import {useAxios} from "@/contexts/AxiosContext.tsx";
import CompletionBadge from "@/components/CompletionBadge.tsx";

// FIXME
// @ts-ignore
function TaskTile({ task }) {
    const client = useAxios();

    return (
        <Card className={`w-full flex justify-between`}>
            <Link to={`/task/${task.id}`} className={`flex flex-grow`}>
                <CardHeader className={`px-3 py-2`}>
                    <CardTitle className={`flex justify-between items-center`}>
                        <h3 className={`text-lg`}>
                            {task.title}
                        </h3>
                    </CardTitle>
                    <CardDescription className={`flex gap-1`}><DifficultyBadge difficulty={task.difficulty}/><CompletionBadge status={task.completed} /></CardDescription>
                    <CardDescription>Deadline: {new Date(task.deadline).toDateString()}</CardDescription>
                </CardHeader>
            </Link>

            <div className={`pr-3 flex gap-1 justify-evenly items-center`}>
                <div
                    className={`p-3 cursor-pointer rounded-full ${task.completed ? "text-red-500 hover:bg-red-100" : "text-emerald-500 hover:bg-emerald-100"} transition`}
                    onClick={() => updateTask(client, task.id, {completed: !task.completed}).then((r) => {
                        console.log(r);
                        window.location.reload();
                    })}>
                    {task.completed ? <FaArrowRotateLeft size={23} /> : <FaCheck size={23} />}
                </div>

                <div
                    className={`p-3 cursor-pointer rounded-full text-red-500 hover:bg-red-100 transition`}
                    onClick={() => deleteTask(client, task.id).then((r) => {
                        console.log(r);
                        window.location.reload();
                    })}>
                    <MdDelete size={23} />
                </div>

                <Link to={`/task/${task.id}`} className={`p-3 rounded-full cursor-pointer hover:bg-gray-100 transition`}>
                    <MdModeEdit size={23} />
                </Link>
            </div>
        </Card>
    );
}

export default TaskTile;
