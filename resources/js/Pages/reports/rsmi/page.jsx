import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Toaster } from "@/Components/ui/toaster";

const RSMI = () => {
    const [search, setSearch] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentYear = currentDate.getFullYear().toString();

    const getMonthName = (monthNumber) =>
        new Date(2000, monthNumber - 1).toLocaleString("default", {
            month: "long",
        });

    const years = Array.from(
        { length: 10 },
        (_, i) => `${currentDate.getFullYear() - i}`
    );

    const handlePrint = () => {};

    return (
        <>
            <div className="flex flex-1 flex-col p-4 pt-0">
                <div className="flex min-h-screen w-full">
                    {/* Sidebar */}

                    {/* Main Content */}
                    <div className="w-full px-6 py-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <p>Filters:</p>
                                <Select
                                    onValueChange={setSelectedMonth}
                                    value={selectedMonth}
                                >
                                    <SelectTrigger className="w-[150px]">
                                        <SelectValue placeholder="Select month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[...Array(12)].map((_, i) => {
                                            const monthValue = String(
                                                i + 1
                                            ).padStart(2, "0");
                                            return (
                                                <SelectItem
                                                    key={monthValue}
                                                    value={monthValue}
                                                >
                                                    {getMonthName(i + 1)}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>

                                <Select
                                    onValueChange={setSelectedYear}
                                    value={selectedYear}
                                >
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={handlePrint} variant="default">
                                    Print
                                </Button>
                            </div>
                        </div>

                        <div id="ris-print-section"></div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

RSMI.layout = (page) => <MainLayout>{page}</MainLayout>;

export default RSMI;
