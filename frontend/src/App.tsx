import Taskboard from "@/pages/TaskBoard.tsx";
import Header from "@/components/Header.tsx";

function App() {
    return (
        <>
            <Header />

            <div className={`px-5 py-5`}>
                <Taskboard />
            </div>
        </>
    );
}

export default App
