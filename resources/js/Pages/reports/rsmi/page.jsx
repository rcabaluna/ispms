import React, { useEffect, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/toaster";
import RSMIDetails from "./Partials/RSMIDetails";

const RSMI = ({ rsmi: initialRsmi }) => {
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentYear = currentDate.getFullYear().toString();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [rsmi, setRsmi] = useState(initialRsmi);
    const [loading, setLoading] = useState(false);

    const getMonthName = (monthNumber) =>
        new Date(2000, monthNumber - 1).toLocaleString("default", {
            month: "long",
        });

    const years = Array.from({ length: 10 }, (_, i) =>
        String(currentDate.getFullYear() - i)
    );

    const fetchRsmiData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `/reports/rsmi/show?month=${selectedMonth}&year=${selectedYear}`
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setRsmi(data);
        } catch (error) {
            console.error("Error fetching RSMI data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRsmiData();
    }, [selectedMonth, selectedYear]);

    const handlePrint = () => {
        const printContents =
            document.getElementById("rsmi-print-section").innerHTML;
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
                .text-11{font-size: 11px !important;}
                .text-13{font-size: 13.33px !important;}
                .width-100{width: 100% !important;}
                .width-50{width: 50% !important;}
                .width-40{width: 40% !important;}
                .width-30{width: 30% !important;}
                .width-35{width: 35% !important;}
                .width-25{width: 25% !important;}
                .width-20{width: 20% !important;}
                .width-15{width: 15% !important;}
                .width-12{width: 12% !important;}
                .width-10{width: 10% !important;}
                .width-8{width: 8% !important;}
                .width-7{width: 7% !important;}
                .width-6{width: 6% !important;}
                .width-5{width: 5% !important;}
                .pdd-2{padding: 2px !important;}
                .pdd-1{padding: 1px !important;}
                .text-9{font-size: 9px !important;}
                .text-8{font-size: 8px !important;}
                .text-7{font-size: 7px !important;}
                .text-10{font-size: 10px !important;}
                .text-11{font-size: 11px !important;}
                .text-12{font-size: 12px !important;}

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

    return (
        <>
            <div className="flex flex-1 flex-col p-4 pt-0">
                <div className="flex min-h-screen w-full">
                    <div className="w-full px-6 py-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <p>Filters:</p>

                                <Select
                                    value={selectedMonth}
                                    onValueChange={(value) =>
                                        setSelectedMonth(value)
                                    }
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
                                    value={selectedYear}
                                    onValueChange={(value) =>
                                        setSelectedYear(value)
                                    }
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

                            <Button onClick={handlePrint} variant="default">
                                Print
                            </Button>
                        </div>

                        {loading ? (
                            <p className="text-center text-gray-500">
                                Loading...
                            </p>
                        ) : (
                            <div id="rsmi-print-section">
                                <RSMIDetails
                                    rsmi={rsmi}
                                    month={selectedMonth}
                                    year={selectedYear}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

RSMI.layout = (page) => <MainLayout>{page}</MainLayout>;

export default RSMI;
