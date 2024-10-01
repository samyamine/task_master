import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {useAxios} from "@/contexts/AxiosContext.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useNavigate} from "react-router-dom";
import {createQuest, getTasks} from "@/lib/utils.ts";

function CreateQuest() {
    const client = useAxios();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState<any[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const initTasks = async () => {
        const data = await getTasks(client);
        setTasks(data);
    };

    const handleTaskSelection = (id: number) => {
        if (selectedTasks.includes(id)) {
            setSelectedTasks(selectedTasks.filter(taskId => taskId !== id));
        }
        else {
            setSelectedTasks([...selectedTasks, id]);
        }
    };

    useEffect(() => {
        initTasks().then(r => console.log(r))
    }, []);

    return (
        <>
            <h1 className={`mb-5 text-xl`}>
                Create Quest
            </h1>

            <div className={`flex flex-col gap-3`}>
                <div>
                    <Label htmlFor={`name`}>Name</Label>
                    <Input id={`name`} type="text" onChange={(e) => setName(e.target.value)}/>
                </div>

                <div>
                    <Label htmlFor={`description`}>Description</Label>
                    <Textarea onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div>
                    <Label htmlFor={`tasks`}>Tasks</Label>
                    {tasks.map(task => (
                        <div key={task.id} className={`mt-2 flex items-center space-x-2`} onClick={() => handleTaskSelection(task.id)}>
                            <Checkbox id={task.id}/>
                            <label htmlFor={task.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {task.title}
                            </label>
                        </div>
                    ))}
                </div>

                <Button className={`mt-5`}
                        onClick={() => createQuest(client, {name, description, selectedTasks}).then(r => {
                            console.log(r);
                            navigate("/questboard/");
                        })}>
                    Create
                </Button>
            </div>
        </>
    );
}

export default CreateQuest;