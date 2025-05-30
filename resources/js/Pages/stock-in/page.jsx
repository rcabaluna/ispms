import MainLayout from "@/Layouts/MainLayout";
import React, { useState } from "react";
import { DataTable } from "./Partials/DataTable";
import { columns } from "./Partials/TableColumns";
import { Input } from "@/Components/ui/input";
import * as XLSX from "xlsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";

import ToUploadItemsTable from "./Partials/ToUploadItemsTable";
import { router } from "@inertiajs/react";
import { ShowToast } from "@/Layouts/ShowToast";
import { Toaster } from "@/components/ui/toaster";

const StockIn = ({ stockins }) => {
    const [excelData, setExcelData] = useState([]);
    const [serialNumber, setSerialNumber] = useState("");
    const [file, setFile] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

                const parsedData = XLSX.utils.sheet_to_json(firstSheet, {
                    defval: "",
                });

                const cleanedData = parsedData.map((row) => {
                    const cleanedRow = {};
                    for (const key in row) {
                        if (!key.startsWith("__EMPTY")) {
                            cleanedRow[key.trim()] = row[key];
                        }
                    }
                    return cleanedRow;
                });

                setExcelData(cleanedData);
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!serialNumber || !file) {
            alert("Please fill in all fields.");
            return;
        }
        router.post(
            route("stock-in.store"),
            {
                serial_number: serialNumber,
                excel_data: excelData,
            },
            {
                onSuccess: (response) => {
                    ShowToast({
                        title: "Success!",
                        description: response.props.flash.message,
                        className: "bg-green-500 text-white",
                    });
                    setSerialNumber("");
                    setFile(null);
                    setExcelData([]);
                    setDialogOpen(false);
                },
                onError: (errors) => {
                    if (errors.serial_number) {
                        ShowToast({
                            title: "Duplicate Serial Number",
                            description: errors.serial_number,
                            className: "bg-red-500 text-white",
                        });
                    } else {
                        ShowToast({
                            title: "Request failed",
                            description: "An unexpected error occurred.",
                            className: "bg-red-500 text-white",
                        });
                    }
                },
            }
        );
    };

    return (
        <>
            <div className="flex flex-1 flex-col gap-4 pt-10 px-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Manage Stock-Ins</h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage inventory stock-ins.
                        </p>
                    </div>
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button>New Stock-in</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-full max-w-3xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Upload new items to stock-in
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Upload an Excel file containing the items
                                    you want to stock in. Make sure the file is
                                    in the correct format.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">
                                            Serial Number
                                        </h4>
                                        <Input
                                            id="serial"
                                            className="col-span-2 h-8"
                                            placeholder="xxxx-xx-xxxx"
                                            value={serialNumber}
                                            onChange={(e) =>
                                                setSerialNumber(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">
                                            Upload Excel File
                                        </h4>
                                        <Input
                                            type="file"
                                            accept=".xlsx,.xls"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <ToUploadItemsTable
                                            excelData={excelData}
                                        />
                                    </div>
                                </div>

                                <AlertDialogFooter className="pt-4">
                                    <AlertDialogCancel type="button">
                                        Cancel
                                    </AlertDialogCancel>
                                    <Button type="submit">Submit</Button>
                                </AlertDialogFooter>
                            </form>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <div className="grid auto-rows-min gap-4 pt-5 md:grid-cols-1">
                    <div className="table-container">
                        <DataTable columns={columns} data={stockins} />
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

StockIn.layout = (page) => <MainLayout>{page}</MainLayout>;

export default StockIn;
