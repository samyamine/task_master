import {Badge} from "@/components/ui/badge.tsx";

function CompletionBadge({status}: {status: boolean}) {
    return (
        <Badge className={`${status ? "hover:bg-emerald-200 bg-emerald-200 text-emerald-500" : "hover:bg-red-200 bg-red-200 text-red-500"} cursor-default rounded-full shadow-none`}>
            {status ? "Completed" : "Not Completed"}
        </Badge>
    );
}

export default CompletionBadge;
