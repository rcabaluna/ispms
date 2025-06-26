// resources/js/Pages/SupplyRequestSent.jsx
import { CheckCircle2 } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

export default function SupplyRequestSent() {
    return (
        <div
            className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
            style={{ backgroundColor: "hsl(var(--primary))" }}
        >
            <div className="flex w-full max-w-sm flex-col gap-3">
                <Card>
                    <CardHeader className="text-center">
                        <CheckCircle2
                            className="mx-auto text-green-500 mb-2"
                            size={32}
                        />
                        <CardTitle className="text-lg font-semibold">
                            Request Sent
                        </CardTitle>
                        <CardDescription>
                            <p>
                                Your supply request has been sent to the Supply
                                Unit.
                            </p>{" "}
                            <p>
                                You will receive an email once the Supply
                                Officer acknowledges your request.
                            </p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button
                            variant="outline"
                            onClick={() => router.visit("/")}
                        >
                            Go Back
                        </Button>
                    </CardContent>
                </Card>

                <div className="text-center text-xs" style={{ color: "#fff" }}>
                    2025. Developed by{" "}
                    <a
                        href="#"
                        style={{
                            color: "#fff",
                            textDecoration: "underline",
                            textUnderlineOffset: "4px",
                        }}
                        onMouseEnter={(e) =>
                            (e.target.style.color = "hsl(var(--primary-hover))")
                        }
                        onMouseLeave={(e) => (e.target.style.color = "#fff")}
                    >
                        DOST 10
                    </a>{" "}
                    - MIS Unit.
                </div>
            </div>
        </div>
    );
}
