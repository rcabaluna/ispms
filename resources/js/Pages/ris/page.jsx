import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Input } from "@/Components/ui/input";
import { columns } from "./Partials/TableColumns";
import { DataTable } from "./Partials/DataTable";
import EmployeesTable from "./Partials/EmployeesTable";
import { Button } from "@/Components/ui/button";
import AddItems from "./Partials/Issuance/AddItems";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Toaster } from "@/Components/ui/toaster";

const RIS = ({ employees }) => {
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentYear = currentDate.getFullYear().toString();

    const [search, setSearch] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [risData, setRisData] = useState([]);

    // New state for selected employee
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const years = Array.from(
        { length: 10 },
        (_, i) => `${currentDate.getFullYear() - i}`
    );

    const getMonthName = (monthNumber) =>
        new Date(2000, monthNumber - 1).toLocaleString("default", {
            month: "long",
        });

    const refreshRISData = () => {
        if (!selectedEmployee) return;

        fetch(
            `/inventory/ris/data/${selectedEmployee.empNumber}?month=${selectedMonth}&year=${selectedYear}`
        )
            .then((res) => res.json())
            .then((data) => setRisData(data))
            .catch((err) => {
                console.error("Failed to refresh RIS data:", err);
            });
    };

    return (
        <>
            <div className="flex flex-1 flex-col p-4 pt-0">
                <div className="flex min-h-screen w-full">
                    {/* Sidebar */}
                    <div className="w-[20%] border-r border-border bg-muted/50 p-4 flex flex-col">
                        <Input
                            type="text"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="mb-2"
                        />
                        <div
                            className="overflow-y-auto"
                            style={{ maxHeight: "calc(100vh - 100px)" }}
                        >
                            <EmployeesTable
                                employees={employees}
                                search={search}
                                month={selectedMonth}
                                year={selectedYear}
                                onRISFetched={(data) => setRisData(data || [])}
                                selectedEmployee={selectedEmployee}
                                setSelectedEmployee={setSelectedEmployee}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-[80%] px-6 py-4 space-y-4">
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

                            <Button
                                onClick={() => setOpenDialog(true)}
                                disabled={!selectedEmployee} // disable if no employee selected
                            >
                                Issue Items
                            </Button>
                        </div>

                        <AddItems
                            openDialog={openDialog}
                            handleClose={setOpenDialog}
                            employee={selectedEmployee}
                            month={selectedMonth}
                            year={selectedYear}
                            refreshRISData={refreshRISData}
                        />

                        <DataTable columns={columns} data={risData} />
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

RIS.layout = (page) => <MainLayout>{page}</MainLayout>;

export default RIS;
