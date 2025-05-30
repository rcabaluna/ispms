import MainLayout from "@/Layouts/MainLayout";
import React from "react";
import { DataTable } from "./Partials/DataTable";
import { columns } from "./Partials/TableColumns";

const InventoryItems = ({ items }) => {
    return (
        <>
            <div className="flex flex-1 flex-col gap-4 pt-10 px-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            Manage Inventory Items
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage inventory items.
                        </p>
                    </div>
                </div>

                <div className="grid auto-rows-min gap-4 pt-5 md:grid-cols-1">
                    <div className="table-container">
                        <DataTable columns={columns} data={items} />
                    </div>
                </div>
            </div>
        </>
    );
};

InventoryItems.layout = (page) => <MainLayout>{page}</MainLayout>;

export default InventoryItems;
