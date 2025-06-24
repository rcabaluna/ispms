import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "./Partials/login-form";

export default function LoginPage() {
    return (
        <div
            className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
            style={{ backgroundColor: "hsl(var(--primary))" }}
        >
            <div className="flex w-full max-w-sm flex-col gap-3">
                <a
                    href="#"
                    className="flex items-center gap-2 self-center font-medium text-primary-foreground"
                >
                    <div className="flex text-center items-center justify-center rounded-md bg-primary text-primary-foreground">
                        Integrated Supplies and Procurement <br /> Management
                        System
                    </div>
                </a>
                <LoginForm />
            </div>
        </div>
    );
}
