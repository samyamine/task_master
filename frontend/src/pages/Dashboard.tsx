import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart.tsx";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";
import {useEffect, useState} from "react";
import {useAxios} from "@/contexts/AxiosContext.tsx";
import {DayData} from "@/lib/types.ts";
import {getXp} from "@/lib/utils.ts";

function Dashboard() {
    const client = useAxios();
    const [chartData, setChartData] = useState<DayData[]>([]);
    const [tasksCount, setTasksCount] = useState(0);
    const [questsCount, setQuestsCount] = useState(0);
    const [xp, setXp] = useState(0);

    const chartConfig = {
        tasks: {
            label: "Tasks",
            color: "#2563eb",
        },
        quests: {
            label: "Quests",
            color: "#60a5fa",
        },
    } satisfies ChartConfig;

    const getData = async () => {
        try {
            let totalTasks = 0;
            let totalQuests = 0;
            const response = await client.get("/api/tasks-quests-last-week/");
            const xp_response = await getXp(client);

            console.log(response.data);

            response.data.forEach((item: DayData) => {
                totalTasks += item.tasks;
                totalQuests += item.quests;
            });

            setChartData(response.data);
            setTasksCount(totalTasks);
            setQuestsCount(totalQuests);
            setXp(xp_response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData().then(r => console.log(r));
    }, []);

    console.log("XP")
    console.log(xp)


    return (
        <>
            <h1 className={`mb-5 text-xl`}>
                Dashboard
            </h1>

            <div className={`mb-5`}>
                <h2 className={`mb-2 text-lg font-bold`}>
                    Creation Frequency
                </h2>

                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="tasks" fill="var(--color-tasks)" radius={4} />
                        <Bar dataKey="quests" fill="var(--color-quests)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>

            <div>
                <h2 className={`mb-2 text-lg font-bold`}>
                Statistics
                </h2>

                <div className={`mb-3`}>
                    <p className={`text-sm`}>Total XP earned: <span className={`font-bold text-md`}>{xp}</span></p>
                </div>

                <div>
                    <p className={`text-sm`}>Total tasks completed: <span className={`font-bold text-md`}>{tasksCount}</span></p>
                    <p className={`text-sm`}>Total quests completed: <span className={`font-bold text-md`}>{questsCount}</span></p>
                </div>
            </div>

        </>
    );
}

export default Dashboard;
