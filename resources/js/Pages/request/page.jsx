import React, { useState } from "react";
import Items from "./Partials/Items";
import Orders from "./Partials/Orders/Orders";

const Request = ({ employees, items }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="flex flex-col flex-1 p-4 pt-0 min-h-screen">
            {/* Page Header */}
            <div className="px-6 py-4">
                <h1
                    className="text-2xl font-bold"
                    style={{ color: "hsl(var(--primary))" }} // Use primary color
                >
                    Office Supplies Requisition Tool
                </h1>
                <p
                    className="mt-1 text-sm max-w-3xl"
                    style={{ color: "hsl(var(--muted-foreground))" }} // muted text color
                >
                    Use this module to request office supplies from the
                    inventory. Select items, specify quantities, and submit your
                    request.
                </p>
            </div>

            <hr
                className="my-2"
                style={{
                    borderTopWidth: "1px",
                    borderColor: "hsl(var(--border))",
                }}
            />

            {/* Main Layout */}
            <div className="flex w-full flex-1">
                {/* Sidebar */}
                <div
                    className="w-[25%] border-r p-4 flex flex-col"
                    style={{
                        backgroundColor: "hsl(var(--sidebar-background))",
                        color: "hsl(var(--sidebar-foreground))",
                        borderColor: "hsl(var(--sidebar-border))",
                    }}
                >
                    <div
                        className="overflow-y-auto relative"
                        style={{ maxHeight: "calc(100vh - 180px)" }}
                    >
                        <Items items={items} onSelectItem={setSelectedItem} />
                    </div>
                </div>

                {/* Orders Section */}
                <div className="flex-1 px-6 py-2 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center w-full">
                            <Orders
                                employees={employees}
                                selectedItem={selectedItem}
                                onItemAdded={() => setSelectedItem(null)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Request;
