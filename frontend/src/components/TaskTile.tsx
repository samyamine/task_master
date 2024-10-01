import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {FaCheck} from "react-icons/fa6";
import {MdDelete, MdModeEdit} from "react-icons/md";
import {Link} from "react-router-dom";
import DifficultyBadge from "@/components/DifficultyBadge.tsx";

// @ts-ignore
function TaskTile({ task }) {
    return (
        <Card className={`w-full flex justify-between`}>
            <Link to={`/task/${task.id}`}>
                <CardHeader className={`px-3 py-2`}>
                    <CardTitle className={`flex justify-between items-center`}>
                        <h3 className={`text-lg`}>
                            {task.title}
                        </h3>

                        {/*<DropdownMenu>*/}
                        {/*    <DropdownMenuTrigger className={`p-1 rounded-full hover:bg-gray-100 transition`}>*/}
                        {/*        <HiOutlineDotsHorizontal />*/}
                        {/*    </DropdownMenuTrigger>*/}
                        {/*    <DropdownMenuContent className={`absolute -right-2 bg-white shadow-md`}>*/}
                        {/*        <DropdownMenuLabel>Options</DropdownMenuLabel>*/}
                        {/*        <DropdownMenuSeparator />*/}
                        {/*        <DropdownMenuItem>Edit</DropdownMenuItem>*/}
                        {/*        <DropdownMenuItem>Completed</DropdownMenuItem>*/}
                        {/*        <DropdownMenuItem>Delete</DropdownMenuItem>*/}
                        {/*    </DropdownMenuContent>*/}
                        {/*</DropdownMenu>*/}

                    </CardTitle>
                    <CardDescription>Difficulty: <DifficultyBadge difficulty={task.difficulty}/></CardDescription>
                    <CardDescription>Deadline: {new Date(task.deadline).toDateString()}</CardDescription>
                </CardHeader>
            </Link>

            <div className={`pr-3 flex gap-1 justify-evenly items-center`}>
                <div className={`p-3 cursor-pointer rounded-full text-emerald-500 hover:bg-emerald-100`}>
                    <FaCheck size={23} />
                </div>

                <div className={`p-3 cursor-pointer rounded-full text-red-500 hover:bg-red-100`}>
                    <MdDelete size={23} />
                </div>

                <div className={`p-3 rounded-full cursor-pointer hover:bg-gray-100`}>
                    <MdModeEdit size={23} />
                </div>
            </div>
        </Card>
    );
}

export default TaskTile;
