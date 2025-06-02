import React from "react";
import OrdersCombobox from "./OrdersCombobox";

const OrdersForm = ({
    employees,
    requesterName,
    supervisorName,
    purpose,
    setRequesterName,
    setSupervisorName,
    setPurpose,
}) => {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        >
            <div className="flex flex-col">
                <label className="mb-2 text-lg font-semibold text-sky-900">
                    Requester Name
                </label>
                <OrdersCombobox
                    employees={employees}
                    value={requesterName}
                    onSelect={setRequesterName}
                    placeholder="Select requester..."
                />
            </div>

            <div className="flex flex-col">
                <label className="mb-2 text-lg font-semibold text-sky-900">
                    Direct Supervisor
                </label>
                <OrdersCombobox
                    employees={employees}
                    value={supervisorName}
                    onSelect={setSupervisorName}
                    placeholder="Select supervisor..."
                />
            </div>

            <div className="flex flex-col md:col-span-2">
                <label className="mb-2 text-lg font-semibold text-sky-900">
                    Purpose
                </label>
                <textarea
                    className="p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
                    rows="2"
                    placeholder="Enter the purpose..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                />
            </div>
        </form>
    );
};

export default OrdersForm;
