import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <div className={`w-full px-10 py-5 flex flex-col items-center bg-blue-300`}>
            <h1 className={`mb-3 text-2xl font-bold`}>
                TaskMaster
            </h1>

            <nav>
                <ul className={`flex gap-3 items-center`}>
                    <li className={`underline underline-offset-4`}><NavLink to={`/`}>Dashboard</NavLink></li>
                    <li className={`underline underline-offset-4`}><NavLink to={`rewards/`}>Rewards</NavLink></li>
                    <li className={`underline underline-offset-4`}><NavLink to={`taskboard/`}>Taskboard</NavLink></li>
                    <li className={`underline underline-offset-4`}><NavLink to={`questboard/`}>Questboard</NavLink></li>
                </ul>
            </nav>
        </div>
    );
}
