import TaskTile from "@/components/TaskTile.tsx";
import {EDifficulty} from "@/lib/utils.ts";

function Taskboard() {
    return (
        <>
            <h1 className={`mb-5 text-xl`}>
                Taskboard
            </h1>

            {/*FIXME: Backend link*/}
            <div className={`flex flex-col gap-3`}>
                <TaskTile title={"Faire les courses"} difficulty={EDifficulty.Easy} deadline={new Date(2024, 9, 29)} />
                <TaskTile title={"Avancer sur le projet"} difficulty={EDifficulty.Hard} deadline={new Date(2024, 10, 3)} />
                <TaskTile title={"Préparer l'interview Eledone"} difficulty={EDifficulty.Medium} deadline={new Date(2024, 10, 3)} />
            </div>
        </>
    );
}

export default Taskboard;
