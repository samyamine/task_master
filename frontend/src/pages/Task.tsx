import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAxios} from "@/contexts/AxiosContext.tsx";
import {Button} from "@/components/ui/button.tsx";
import DifficultyBadge from "@/components/DifficultyBadge.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {deleteTask, formatDateTime, updateTask} from "@/lib/utils.ts";
import CompletionBadge from "@/components/CompletionBadge.tsx";

function Task() {
    const client = useAxios();
    const navigate = useNavigate();
    const {id} = useParams();
    const [task, setTask] = useState<{[key: string]: any} | null>(null);

    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [difficulty, setDifficulty] = useState<number>();
    const [deadline, setDeadline] = useState<string>();
    const [maxDateTime, setMaxDateTime] = useState<string>();

    const getTask = async () => {
        try {
            const response = await client.get(`/api/tasks/${id}/`);
            console.log(response.data);

            setTask(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // const deleteTask = async () => {
    //     try {
    //         const response = await client.delete(`/api/tasks/${id}/`);
    //         console.log("Tâche supprimée avec succès :", response.data);
    //
    //         navigate("/taskboard/");
    //     } catch (error) {
    //         console.error("Erreur lors de la suppression de la tâche :", error);
    //     }
    // };

    // const updateTask = async (data: { [key: string]: any }) => {
    //     try {
    //         const response = await client.patch(`/api/tasks/${id}/`, data);
    //         console.log("Tâche validée avec succès :", response.data);
    //         window.location.reload();
    //     } catch (error) {
    //         console.error("Erreur lors de la validation de la tâche :", error);
    //     }
    // };

    useEffect(() => {
        // getTask(client, String(id)).then(response => {
        //     console.log("RESPONSE")
        //     console.log(response)
        //     setTask(response.data);
        //
        //     const now = new Date(); // Date actuelle
        //     const oneYearFromNow = new Date();
        //     oneYearFromNow.setFullYear(now.getFullYear() + 1);
        //
        //     setDeadline(formatDateTime(now));
        //     setMaxDateTime(formatDateTime(oneYearFromNow));
        //     window.location.reload();
        // });
        getTask().then(response => {
            console.log("RESPONSE")
            console.log(response)

            const now = new Date(); // Date actuelle
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(now.getFullYear() + 1);

            setDeadline(formatDateTime(now));
            setMaxDateTime(formatDateTime(oneYearFromNow));
        });
    }, []);

    return task === null ? (
        <div className={`w-full flex justify-center items-center`}>
            Loading...
        </div>
        ) : (
        <>
            <div className={`mb-5 flex justify-between items-center`}>
                <h1 className={`text-xl`}>
                    {task.title}
                </h1>

                <div>
                    <Button className={`mr-2 bg-emerald-500`} onClick={() => updateTask(client, String(id), {completed: true}).then(r => {
                            console.log(r);
                            window.location.reload();
                        })}>
                        Done
                    </Button>
                    <Button className={`bg-red-500`} onClick={() => deleteTask(client, String(id)).then(r => {
                            console.log(r);
                            navigate("/taskboard/");
                        })}>
                        Delete
                    </Button>
                </div>

            </div>

            <div className={`mb-5`}>
                <CompletionBadge status={task.completed} />
            </div>

            <div className={`mb-1 flex items-center gap-2`}>
                <h2 className={`font-bold`}>Difficulty</h2>
                <DifficultyBadge difficulty={task.difficulty}/>
            </div>

            <div className={`flex items-center gap-2`}>
                <h2 className={`font-bold`}>Deadline</h2>
                <p>{new Date(task.deadline).toDateString()}</p>
            </div>

            <div className={`my-7`}>
                <h2 className={`mb-1 font-bold`}>
                    Description
                </h2>

                <p>{task.description}</p>
            </div>

            <div className={`mb-5 flex items-center gap-2`}>
                <h2 className={`font-bold`}>XP when completed:</h2>
                <p>{task.xp_reward} XP</p>
            </div>

            <div className={`mt-16 flex flex-col gap-3`}>
                <h2 className={`text-xl`}>
                    Edit
                </h2>
                <div>
                    <Label htmlFor={`title`}>Title</Label>
                    <Input id={`title`} defaultValue={task.title} type="text" onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div>
                    <Label htmlFor={`description`}>Description</Label>
                    <Textarea defaultValue={task.description} onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div>
                    <Label>Difficulty</Label>
                    <Select defaultValue={String(task.difficulty)} onValueChange={(value) => setDifficulty(Number(value))}>
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select..."/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">Easy</SelectItem>
                            <SelectItem value="1">Medium</SelectItem>
                            <SelectItem value="2">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className={`flex flex-col gap-1`}>
                    <Label htmlFor={`deadline`}>Deadline</Label>
                    <input className={`px-2 py-1 rounded-md border-[1px] border-gray-200 shadow-sm text-sm`}
                           type="datetime-local"
                           id="deadline"
                           name="deadline"
                           defaultValue={deadline}  // formatDateTime(new Date(task.deadline))
                           min={deadline}
                           max={maxDateTime}
                           onChange={(e) => setDeadline(e.target.value)}/>
                </div>

                <Button className={`mt-5`} onClick={() => updateTask(client, String(id),{
                        title: title ?? task.title,
                        description: description ?? task.description,
                        difficulty: difficulty ?? task.difficulty,
                        deadline:  deadline ? new Date(deadline) : new Date(task.deadline),
                        xp_reward: difficulty ? 10 * (Number(difficulty) + 1) : 10 * (Number(task.difficulty) + 1),
                    }).then(r => {
                        console.log(r);
                        window.location.reload();
                    })}>
                    Update
                </Button>
            </div>
        </>
    );
}

export default Task;
