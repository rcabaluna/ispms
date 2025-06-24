"use client";

import React from "react";
import OrdersForm from "./OrdersForm";
import OrdersTable from "./OrdersTable";
import useOrders from "./useOrders";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Orders = ({ employees, selectedItem, onItemAdded }) => {
    const {
        requester,
        supervisor,
        items,
        requesterName,
        supervisorName,
        purpose,
        setPurpose,
        setRequesterName,
        setSupervisorName,
        updateQuantity,
        removeItem,
        checkout,
        isProcessing,
    } = useOrders({ employees, selectedItem, onItemAdded });

    return (
        <section
            className="w-full py-10"
            style={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--card-foreground))",
            }}
        >
            <OrdersForm
                employees={employees}
                requesterName={requesterName}
                supervisorName={supervisorName}
                purpose={purpose}
                setRequesterName={setRequesterName}
                setSupervisorName={setSupervisorName}
                setPurpose={setPurpose}
            />

            <OrdersTable
                items={items}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
            />

            <div className="flex justify-end mt-8">
                <Button
                    type="button"
                    onClick={checkout}
                    disabled={
                        isProcessing ||
                        !requester ||
                        !supervisor ||
                        items.length === 0
                    }
                    className="text-lg px-6 py-3 flex items-center gap-2"
                    style={{
                        backgroundColor: isProcessing
                            ? "hsl(var(--muted))"
                            : "hsl(var(--primary))",
                        color: isProcessing
                            ? "hsl(var(--muted-foreground))"
                            : "hsl(var(--primary-foreground))",
                        cursor: isProcessing ? "not-allowed" : "pointer",
                        opacity: isProcessing ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => {
                        if (!isProcessing)
                            e.currentTarget.style.backgroundColor =
                                "hsl(var(--primary-foreground))";
                        e.currentTarget.style.color = "hsl(var(--primary))";
                    }}
                    onMouseLeave={(e) => {
                        if (!isProcessing)
                            e.currentTarget.style.backgroundColor =
                                "hsl(var(--primary))";
                        e.currentTarget.style.color =
                            "hsl(var(--primary-foreground))";
                    }}
                >
                    {isProcessing ? (
                        <>
                            <span className="animate-spin mr-2">⏳</span>
                            Processing...
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-5 h-5" />
                            Submit
                        </>
                    )}
                </Button>
            </div>
        </section>
    );
};

export default Orders;
