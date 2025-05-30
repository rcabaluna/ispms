import React from "react";
import OrdersCombobox from "./OrdersCombobox";

const OrdersForm = ({
    employees,
    requesterName,
    supervisorName,
    setRequesterName,
    setSupervisorName,
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
        </form>
    );
};

export default OrdersForm;
