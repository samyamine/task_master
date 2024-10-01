import {Link} from "react-router-dom";
import {IoAddOutline} from "react-icons/io5";
import {useEffect, useState} from "react";
import {useAxios} from "@/contexts/AxiosContext.tsx";
import QuestTile from "@/components/QuestTile.tsx";

function QuestBoard() {
    const client = useAxios();

    const [quests, setQuests] = useState<any[]>([]);

    const getQuests = async () => {
        try {
            const response = await client.get("/api/quests/");
            console.log(response.data);

            setQuests(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getQuests().then(r => console.log(r));
    }, []);

    return (
        <>
            <div className={`mb-5 flex justify-between items-center`}>
                <h1 className={`text-xl`}>
                    Questboard
                </h1>

                <Link to={`/create-quest`}
                      className={`p-2 cursor-pointer rounded-full hover:bg-gray-100 hover:bg-opacity-80 transition`}>
                    <IoAddOutline size={30}/>
                </Link>
            </div>

            <div className={`flex flex-col gap-3`}>
                {quests.map((quest) => (
                    <QuestTile key={quest.id} quest={quest}/>
                ))}
            </div>
        </>
    );
}

export default QuestBoard;
