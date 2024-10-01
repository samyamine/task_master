import Header from "@/components/Header.tsx";
import {AxiosProvider} from "@/contexts/AxiosContext.tsx";
import {Outlet} from "react-router-dom";


function App() {
    return (
        <AxiosProvider>
            <>
                <Header />

                <div className={`p-5`}>
                    <Outlet />
                </div>
            </>
        </AxiosProvider>
    );
}

export default App
