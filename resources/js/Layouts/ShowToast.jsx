import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

export function ShowToast({ title, description, className }) {
    toast({
        title,
        description,
        className: className || "bg-green-500 text-white",
    });
    <Toaster />;
}
