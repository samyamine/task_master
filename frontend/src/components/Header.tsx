import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <div className={`w-full px-10 py-5 flex flex-col items-center bg-blue-300`}>
            <h1 className={`mb-3 text-2xl font-bold`}>
                TaskMaster
            </h1>

            <nav>
                <ul className={`flex gap-2 items-center`}>
                    <li><NavLink to={`dashboard/`}>Dashboard</NavLink></li>
                    <li><NavLink to={`rewards/`}>Rewards</NavLink></li>
                    <li><NavLink to={`taskboard/`}>Taskboard</NavLink></li>
                    <li><NavLink to={`questboard/`}>Questboard</NavLink></li>
                </ul>
            </nav>
        </div>
    );
}
