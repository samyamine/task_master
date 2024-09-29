import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {difficultyBackgrounds, difficultyColors, difficultyTexts, EDifficulty} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

function TaskTile({ title, difficulty, deadline }: {title: string, difficulty: EDifficulty, deadline: Date}) {
    return (
        <Card>
            <CardHeader className={`px-3 py-2`}>
                <CardTitle className={`flex justify-between items-center`}>
                    <h3 className={`text-lg`}>
                        {title}
                    </h3>

                    <DropdownMenu>
                        <DropdownMenuTrigger className={`p-1 rounded-full hover:bg-gray-100 transition`}>
                            <HiOutlineDotsHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={`absolute -right-2 bg-white shadow-md`}>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Completed</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </CardTitle>
                <CardDescription>Difficulté: {getDifficulty(difficulty)}</CardDescription>
                <CardDescription>Deadline: {deadline.toDateString()}</CardDescription>
            </CardHeader>
        </Card>
    );
}

function getDifficulty(difficulty: EDifficulty) {
    return (
        <Badge className={`${difficultyBackgrounds[difficulty]} rounded-full shadow-none`}>
            <p className={difficultyColors[difficulty]}>
                {difficultyTexts[difficulty]}
            </p>
        </Badge>
    );
}

export default TaskTile;
