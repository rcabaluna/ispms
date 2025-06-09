import React, { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Input } from "@/Components/ui/input";
import EmployeesTable from "./Partials/EmployeesTable";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Toaster } from "@/Components/ui/toaster";
import RISDetails from "./Partials/RISDetails";

const RIS = ({ employees }) => {
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentYear = currentDate.getFullYear().toString();

    const [search, setSearch] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [risData, setRisData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const years = Array.from(
        { length: 10 },
        (_, i) => `${currentDate.getFullYear() - i}`
    );
    const getMonthName = (monthNumber) =>
        new Date(2000, monthNumber - 1).toLocaleString("default", {
            month: "long",
        });

    const handlePrint = () => {
        const printContents =
            document.getElementById("ris-print-section").innerHTML;
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`<html><head><title>Print RIS</title>`);
        printWindow.document.write(
            `<style>
            body { font-family: Arial, sans-serif; font-size: 18px; }
            .text-l { text-align: left; }
            .text-r { text-align: right; }
            .brdr-l { border-left: 1px solid black; }
            .brdr-r { border-right: 1px solid black; }
            .brdr-t { border-top: 1px solid black; }
            .brdr-b { border-bottom: 1px solid black; }
            .brdr-n { border: none; }
            .brdr-a { border: 1px solid black; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding-left: 2px; padding-right: 2px; text-align: center; }
            .text-16{font-size: 16px !important;}
            .text-12{font-size: 12px !important;}
            .text-13{font-size: 13.33px !important;}

            </style>`
        );
        printWindow.document.write(
            `</head><body>${printContents}</body></html>`
        );
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    const handleExportToExcel = () => {
        if (!risData.length) return alert("No data to export.");

        const tableData = risData.map((row) => ({
            "Stock No.": row.stockNo,
            UOM: row.unit,
            Description: row.itemName,
            Quantity: row.quantity,
            Available: row.available ? "Yes" : "No",
            "Issue Qty": row.issueQty,
        }));

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [
                Object.keys(tableData[0]).join(","),
                ...tableData.map((row) => Object.values(row).join(",")),
            ].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "ris_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

                            <div className="flex gap-2">
                                <Button
                                    onClick={handleExportToExcel}
                                    variant="outline"
                                >
                                    Export to Excel
                                </Button>
                                <Button onClick={handlePrint} variant="default">
                                    Print
                                </Button>
                            </div>
                        </div>

                        <div id="ris-print-section">
                            <RISDetails risData={risData} />
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

RIS.layout = (page) => <MainLayout>{page}</MainLayout>;

export default RIS;
