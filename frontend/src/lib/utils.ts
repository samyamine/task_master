import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AxiosInstance} from "axios";
import {LEVEL_XP, LEVEL_XP_INCREASER} from "@/lib/consts.ts";


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
        const response = await client.get(`/api/total_xp/`);
        console.log(response.data);

        return Number(response.data["total_xp"]);
    } catch (error) {
        console.log(error);
    }
}

// async function getTask(client: AxiosInstance, id: string) {
//     try {
//         const response = await client.get(`/api/tasks/${id}/`);
//         console.log(response.data);
//
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// }

async function deleteTask(client: AxiosInstance, id: string) {
    try {
        const response = await client.delete(`/api/tasks/${id}/`);
        console.log("Tâche supprimée avec succès :", response.data);

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la tâche :", error);
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


// ENUMS
enum EDifficulty {
    Easy,
    Medium,
    Hard
}


// CONSTS
const difficultyBackgrounds = ["bg-emerald-200", "bg-orange-200", "bg-red-200"];
const difficultyColors = ["text-emerald-500", "text-orange-500", "text-red-500"];
const difficultyTexts = ["Easy", "Medium", "Hard"];

export {
    computeLevel,
    EDifficulty,
    formatDateTime,
    // getTask,
    getXp,
    deleteTask,
    updateTask,
    difficultyBackgrounds,
    difficultyColors,
    difficultyTexts,
}
