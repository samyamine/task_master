import Header from "@/components/Header.tsx";
import {AxiosProvider} from "@/contexts/AxiosContext.tsx";
import {Outlet} from "react-router-dom";


function App() {
    return (
        <AxiosProvider>
            <div className={`max-w-[800px]`}>
                <Header />

                <div className={`p-5`}>
                    <Outlet />
                </div>
            </div>
        </AxiosProvider>
    );
}

export default App
