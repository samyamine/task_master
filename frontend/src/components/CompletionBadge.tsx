import {Badge} from "@/components/ui/badge.tsx";

function CompletionBadge({status}: {status: boolean}) {
    return (
        <Badge className={`${status ? "bg-emerald-200 text-emerald-500" : "bg-red-200 text-red-500"} rounded-full shadow-none`}>
            {status ? "Completed" : "Not Completed"}
        </Badge>
    );
}

export default CompletionBadge;
