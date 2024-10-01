import {useAxios} from "@/contexts/AxiosContext.tsx";
import {useEffect, useState} from "react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {FaCheck} from "react-icons/fa6";


// FIXME: Rewards are not updated when tasks change
function Rewards() {
    const client = useAxios();

    const [rewards, setRewards] = useState<any[]>([]);

    const getRewards = async () => {
        try {
            const response = await client.get("/api/rewards/");
            console.log(response.data);

            setRewards(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRewards().then(r => console.log(r));
    }, []);

    return (
        <>
            <h1 className={`mb-5 text-xl`}>
                Rewards
            </h1>

            <div className={`flex flex-col gap-3`}>
                {rewards.map(reward => (
                    <Card key={reward.id} className={`w-full flex justify-between`}>
                        <CardHeader className={`px-3 py-2`}>
                            <CardTitle className={`flex justify-between items-center`}>
                                <h3 className={`text-lg`}>
                                    {reward.title}
                                </h3>
                            </CardTitle>
                            <CardDescription>{reward.description}</CardDescription>
                        </CardHeader>

                        <div className={`${!reward.completed && "hidden"} p-3 cursor-pointer rounded-full text-emerald-500 hover:bg-emerald-100 transition`}>
                            <FaCheck size={23}/>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default Rewards;
