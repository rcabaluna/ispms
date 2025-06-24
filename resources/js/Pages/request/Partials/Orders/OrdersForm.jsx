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
                <label
                    className="mb-2 text-lg font-semibold"
                    style={{ color: "hsl(var(--primary))" }}
                >
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
                <label
                    className="mb-2 text-lg font-semibold"
                    style={{ color: "hsl(var(--primary))" }}
                >
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
                <label
                    className="mb-2 text-lg font-semibold"
                    style={{ color: "hsl(var(--primary))" }}
                >
                    Purpose
                </label>
                <textarea
                    className="p-3 rounded-sm resize-none focus:outline-none"
                    style={{
                        borderColor: "hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                    }}
                    rows={2}
                    placeholder="Enter purpose..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    onFocus={(e) =>
                        (e.target.style.borderColor = "hsl(var(--primary))")
                    }
                    onBlur={(e) =>
                        (e.target.style.borderColor = "hsl(var(--border))")
                    }
                />
            </div>
        </form>
    );
};

export default OrdersForm;
