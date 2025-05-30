// resources/js/Pages/SupplyRequestSent.jsx
import { CheckCircle2 } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

export default function SupplyRequestSent() {
    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader className="flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={24} />
                <CardTitle className="text-lg font-semibold">
                    Request Sent
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700">
                    Your supplies request has been sent to the supply unit. You
                    will receive an email after the supply officer acknowledged
                    your request.
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={() => router.visit("/")}>
                    Go Back
                </Button>
            </CardFooter>
        </Card>
    );
}
