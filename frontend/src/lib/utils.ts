import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


// FUNCTIONS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
    EDifficulty,
    formatDateTime,
    difficultyBackgrounds,
    difficultyColors,
    difficultyTexts,
}
