import Header from "@/components/Header.tsx";
import {useAxios} from "@/contexts/AxiosContext.tsx";
import {Outlet} from "react-router-dom";
import {Progress} from "@/components/ui/progress.tsx";
import {computeLevel, getXp} from "@/lib/utils.ts";
import {useEffect, useState} from "react";


function App() {
    const client = useAxios();
    const [level, setLevel] = useState(0);
    const [progress, setProgress] = useState(0);

    const initLevel = async () => {
        const xp = await getXp(client);
        const res = computeLevel(Number(xp));

        setLevel(res.level);
        setProgress(res.progress);
    };

    useEffect(() => {
        initLevel().then(r => console.log(r));
    }, []);


    return (
        <div className={`w-full`}>
            <Header/>

            <div className={`mt-5 mx-5 flex justify-between items-center gap-3`}>
                <h1 className={`min-w-fit`}>
                    Level <span className={`font-bold`}>{level}</span>
                </h1>

                <Progress value={progress}/>
            </div>

            <div className={`p-5`}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App
