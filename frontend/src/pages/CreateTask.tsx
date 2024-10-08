import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {createTask, formatDateTime} from "@/lib/utils.ts";
import {useAxios} from "@/contexts/AxiosContext.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

function CreateTask() {
    const client = useAxios();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState<number>(-1);
    const [deadline, setDeadline] = useState("");
    const [estimatedDuration, setEstimatedDuration] = useState("00:00");
    const [maxDateTime, setMaxDateTime] = useState("");

    useEffect(() => {
        const now = new Date(); // Date actuelle
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(now.getFullYear() + 1);

        setDeadline(formatDateTime(now));
        setMaxDateTime(formatDateTime(oneYearFromNow));
    }, []);

    console.log(estimatedDuration);

    return (
        <>
            <h1 className={`mb-5 text-xl`}>
                Create Task
            </h1>

            <div className={`flex flex-col gap-3`}>
                <div>
                    <Label htmlFor={`title`}>Title</Label>
                    <Input id={`title`} type="text" onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div>
                    <Label htmlFor={`description`}>Description</Label>
                    <Textarea onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div>
                    <Label>Difficulty</Label>
                    <Select onValueChange={(value) => setDifficulty(Number(value))}>
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

                {/* FIXME: Estimated time */}
                <div className={`flex flex-col gap-1`}>
                    <Label htmlFor={`duration`}>Estimated duration</Label>
                    <input className={`px-2 py-1 rounded-md border-[1px] border-gray-200 shadow-sm text-sm`}
                           type="time"
                           id="duration"
                           name="duration"
                           value={estimatedDuration}
                           min={`00:00`}
                           max={`24:00`}
                           onChange={(e) => setEstimatedDuration(e.target.value)}/>
                </div>

                <div className={`flex flex-col gap-1`}>
                    <Label htmlFor={`deadline`}>Deadline</Label>
                    <input className={`px-2 py-1 rounded-md border-[1px] border-gray-200 shadow-sm text-sm`}
                           type="datetime-local"
                           id="deadline"
                           name="deadline"
                           value={deadline}
                           min={deadline}
                           max={maxDateTime}
                           onChange={(e) => setDeadline(e.target.value)}/>
                </div>

                <Button className={`mt-5`}
                        onClick={() => createTask(client, {title, description, deadline, difficulty, estimated_duration: `${estimatedDuration}:00`}).then(r => {
                            console.log(r);
                            navigate("/taskboard/");
                        })}>
                    Create
                </Button>
            </div>
        </>
    );
}

export default CreateTask;