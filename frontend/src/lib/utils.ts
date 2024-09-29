import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

enum EDifficulty {
    Easy,
    Medium,
    Hard
}

const difficultyBackgrounds = ["bg-emerald-200", "bg-orange-200", "bg-red-200"];
const difficultyColors = ["text-emerald-500", "text-orange-500", "text-red-500"];
const difficultyTexts = ["Easy", "Medium", "Hard"];

export {
    EDifficulty,
    difficultyBackgrounds,
    difficultyColors,
    difficultyTexts,
}
