import React, { useState } from "react";
import Items from "./Partials/Items";
import Orders from "./Partials/Orders/Orders";

const Request = ({ employees, items }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="flex flex-col flex-1 p-4 pt-0 min-h-screen">
            {/* Page Header */}
            <div className="px-6 py-4">
                <h1 className="text-2xl font-bold text-sky-800">
                    Office Supplies Requisition Tool
                </h1>
                <p className="text-gray-600 mt-1 text-sm max-w-3xl">
                    Use this module to request office supplies from the
                    inventory. Select items, specify quantities, and submit your
                    request.
                </p>
            </div>

            <hr className="border-t border-sky-200 my-2" />

            {/* Main Layout */}
            <div className="flex w-full flex-1">
                {/* Sidebar */}
                <div className="w-[25%] border-r border-border bg-white p-4 flex flex-col">
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
