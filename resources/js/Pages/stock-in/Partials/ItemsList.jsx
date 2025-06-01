import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { DataTable } from "./DataTable";
import { columns } from "./ItemsList/TableColumns";
import { Toaster } from "@/components/ui/toaster";

const ItemsList = ({ stockin, items }) => {
    const handleBack = () => {
        window.history.back();
    };

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        return new Date(dateString).toLocaleString("en-US", options);
    };

    return (
        <>
            <div className="flex flex-1 flex-col gap-4 pt-10 px-10">
                <div className="flex items-center justify-between">
                    <div>
                        <button
                            onClick={handleBack}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            ← Back
                        </button>
                        <h1 className="text-xl font-bold">
                            PO Number: {stockin.ponumber}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Date Uploaded: {formatDate(stockin.created_at)}
                        </p>
                    </div>
                </div>

                <div className="grid auto-rows-min gap-4 pt-5 md:grid-cols-1">
                    <div className="table-container">
                        <DataTable columns={columns} data={items} />
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

ItemsList.layout = (page) => <MainLayout>{page}</MainLayout>;

export default ItemsList;
