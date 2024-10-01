import {difficultyBackgrounds, difficultyColors, difficultyTexts, EDifficulty} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";

function DifficultyBadge({difficulty}: {difficulty: EDifficulty}) {
    return (
        <Badge className={`${difficultyBackgrounds[difficulty]} cursor-default rounded-full shadow-none`}>
            <p className={difficultyColors[difficulty]}>
                {difficultyTexts[difficulty]}
            </p>
        </Badge>
    );
}

export default DifficultyBadge;
