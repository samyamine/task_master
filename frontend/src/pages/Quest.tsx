import {useAxios} from "@/contexts/AxiosContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteQuest, getQuest, getTasks, updateQuest} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import CompletionBadge from "@/components/CompletionBadge.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

function Quest() {
    const client = useAxios();
    const navigate = useNavigate();
    const {id} = useParams();

    const [quest, setQuest] = useState<{[key: string]: any} | null>(null);

    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [tasks, setTasks] = useState<any[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<any[]>([]);

    const handleTaskSelection = (taskId: number) => {
        if (selectedTasks.includes(taskId)) {
            setSelectedTasks(selectedTasks.filter(i => i !== taskId));
        }
        else {
            setSelectedTasks([...selectedTasks, taskId]);
        }
    };

    const init = async () => {
        const questData = await getQuest(client, String(id));
        const tasksData = await getTasks(client);

        setQuest(questData);
        setSelectedTasks(questData.tasks);
        setTasks(tasksData);
    };

    useEffect(() => {
        init().then(r => console.log(r))
    }, []);

    return quest === null ? (
        <div className={`w-full flex justify-center items-center`}>
            Loading...
        </div>
    ) : (
        <>
            <div className={`mb-5 flex justify-between items-center`}>
                <h1 className={`text-xl`}>
                    {quest.name}
                </h1>

                <Button className={`bg-red-500`} onClick={() => deleteQuest(client, String(id)).then(r => {
                    console.log(r);
                    navigate("/questboard/");
                })}>
                    Delete
                </Button>

            </div>

            <div className={`mb-5`}>
                <CompletionBadge status={quest.completed}/>
            </div>

            <div className={`my-7`}>
                <h2 className={`mb-1 font-bold`}>
                    Description
                </h2>

                <p>{quest.description}</p>
            </div>

            <div className={`mb-5 flex items-center gap-2`}>
                <h2 className={`font-bold`}>XP when completed:</h2>
                <p>{quest.xp_reward} XP</p>
            </div>

            <div className={`mt-16 flex flex-col gap-3`}>
                <h2 className={`text-xl`}>
                    Edit
                </h2>
                <div>
                    <Label htmlFor={`name`}>Name</Label>
                    <Input id={`name`} defaultValue={quest.title} type="text"
                           onChange={(e) => setName(e.target.value)}/>
                </div>

                <div>
                    <Label htmlFor={`description`}>Description</Label>
                    <Textarea defaultValue={quest.description} onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div>
                    <Label htmlFor={`tasks`}>Tasks</Label>
                    {tasks.map(task => (
                        <div key={task.id} className={`mt-2 flex items-center space-x-2`}
                             onClick={() => handleTaskSelection(task.id)}>
                            <Checkbox id={task.id} checked={selectedTasks.includes(task.id)}/>
                            <label htmlFor={task.id}
                                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {task.title}
                            </label>
                        </div>
                    ))}
                </div>

                <Button className={`mt-5`} onClick={() => updateQuest(client, String(id), {
                        name: name ?? quest.name,
                        description: description ?? quest.description,
                        tasks: selectedTasks,
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

export default Quest;
