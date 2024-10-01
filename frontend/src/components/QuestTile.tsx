import {useAxios} from "@/contexts/AxiosContext.tsx";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import CompletionBadge from "@/components/CompletionBadge.tsx";
import {MdDelete, MdModeEdit} from "react-icons/md";
import {deleteQuest} from "@/lib/utils.ts";

// FIXME
// @ts-ignore
function QuestTile({ quest }) {
    const client = useAxios();

    return (
        <Card className={`w-full flex justify-between`}>
            <Link to={`/quest/${quest.id}`} className={`flex flex-grow`}>
                <CardHeader className={`px-3 py-2`}>
                    <CardTitle className={`flex justify-between items-center`}>
                        <h3 className={`text-lg`}>
                            {quest.name}
                        </h3>
                    </CardTitle>
                    <CardDescription className={`flex gap-1`}><CompletionBadge status={quest.completed} /></CardDescription>
                    <CardDescription>Progress: {quest.progress}%</CardDescription>
                </CardHeader>
            </Link>

            <div className={`pr-3 flex gap-1 justify-evenly items-center`}>
                <div
                    className={`p-3 cursor-pointer rounded-full text-red-500 hover:bg-red-100 transition`}
                    onClick={() => deleteQuest(client, quest.id).then((r) => {
                        console.log(r);
                        window.location.reload();
                    })}>
                    <MdDelete size={23} />
                </div>

                <Link to={`/quest/${quest.id}`} className={`p-3 rounded-full cursor-pointer hover:bg-gray-100 transition`}>
                    <MdModeEdit size={23} />
                </Link>
            </div>
        </Card>
    );
}

export default QuestTile;
