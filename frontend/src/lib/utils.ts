import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AxiosInstance} from "axios";
import {LEVEL_XP, LEVEL_XP_INCREASER, QUEST_XP_REWARD} from "@/lib/consts.ts";


// FUNCTIONS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function computeLevel(total_xp: number) {
    let remaining_xp = total_xp;
    let xp_required = LEVEL_XP;
    let level: number = 1;

    while (remaining_xp > xp_required) {
        level += 1;
        remaining_xp -= xp_required
        xp_required *= LEVEL_XP_INCREASER;
    }

    return {level: level, progress: remaining_xp * 100 / xp_required};
}

function formatDateTime(date: Date) {
    const padZero = (num: number) => (num < 10 ? `0${num}` : num);

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

async function getXp(client: AxiosInstance) {
    try {
        const tasks_xp = await client.get(`/api/total_xp/`);
        const rewards_xp = await client.get(`/api/rewards/total_xp/`);
        console.log(tasks_xp.data);
        console.log(rewards_xp.data);

        return Number(tasks_xp.data.total_xp) + Number(rewards_xp.data.total_xp);

    } catch (error) {
        console.log(error);
        return 0;
    }
}

async function getTasks(client: AxiosInstance) {
    try {
        const response = await client.get("/api/tasks/");
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
}

async function getQuest(client: AxiosInstance, id: string) {
    try {
        const response = await client.get(`/api/quests/${id}/`);
        console.log("QUEST");
        console.log(response.data);

        return response.data;

    } catch (error) {
        console.log(error);
    }
}

async function createTask(client: AxiosInstance, data: { title: string, difficulty: number, description: string, deadline: string }) {
    if (data.difficulty === -1) {
        console.log("Difficulty has not been provided");
        return;
    }
    if (data.title.length === 0 || data.description.length === 0 || data.deadline.length === 0) {
        console.log("Please fill all information");
        return;
    }

    try {
        const response = await client.post("/api/tasks/", {
            title: data.title,
            description: data.description,
            completed: false,
            difficulty: data.difficulty,
            deadline: new Date(data.deadline),
            xp_reward: 10 * (data.difficulty + 1),
        });

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
    }
}

async function createQuest(client: AxiosInstance, data: { name: string, description: string, selectedTasks: number[] }) {
    if (data.name.length === 0 || data.description.length === 0) {
        console.log("Please fill all information");
        return;
    }

    try {
        const response = await client.post("/api/quests/", {
            name: data.name,
            description: data.description,
            progress: 0,
            tasks: data.selectedTasks,
            completed: false,
            xp_reward: QUEST_XP_REWARD,
        });

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
    }
}

async function deleteTask(client: AxiosInstance, id: string) {
    try {
        const response = await client.delete(`/api/tasks/${id}/`);
        console.log("Tâche supprimée avec succès :", response.data);

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la tâche :", error);
    }
}

async function deleteQuest(client: AxiosInstance, id: string) {
    try {
        const response = await client.delete(`/api/quests/${id}/`);
        console.log("Quête supprimée avec succès :", response.data);

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la quête :", error);
    }
}

async function updateTask(client: AxiosInstance, id: string, data: { [key: string]: any }) {
    try {
        const response = await client.patch(`/api/tasks/${id}/`, data);
        console.log("Tâche validée avec succès :", response.data);

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la validation de la tâche :", error);
    }
}

async function updateQuest(client: AxiosInstance, id: string, data: { [key: string]: any }) {
    try {
        const response = await client.patch(`/api/quests/${id}/`, data);
        console.log("Quête validée avec succès:", response.data);

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la validation de la quête:", error);
    }
}


// ENUMS
enum EDifficulty {
    Easy,
    Medium,
    Hard
}


// CONSTS
const difficultyBackgrounds = ["hover:bg-emerald-200 bg-emerald-200", "hover:bg-orange-200 bg-orange-200", "hover:bg-red-200 bg-red-200"];
const difficultyColors = ["text-emerald-500", "text-orange-500", "text-red-500"];
const difficultyTexts = ["Easy", "Medium", "Hard"];

export {
    computeLevel,
    EDifficulty,
    formatDateTime,
    getQuest,
    getTasks,
    createQuest,
    createTask,
    getXp,
    deleteQuest,
    deleteTask,
    updateTask,
    updateQuest,
    difficultyBackgrounds,
    difficultyColors,
    difficultyTexts,
}
