import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { router } from "@inertiajs/react";

export function LoginForm({ className, ...props }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        router.post(
            route("auth.login"),
            {
                username,
                password,
            },
            {
                // onSuccess: () => {
                //     window.location.href = "inventory/items";
                // },
                onError: (errors) => {
                    if (errors.invalid) {
                        setErrorMessage(errors.invalid);
                    }
                },
            }
        );
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">ISPMS</CardTitle>
                    <CardDescription>
                        Integrated Supplies and Procurement Management System
                        {errorMessage && (
                            <div className="text-red-500 text-sm text-center">
                                {errorMessage}
                            </div>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                2025. Developed by <a href="#">DOST 10</a> - MIS Unit.
            </div>
        </div>
    );
}
