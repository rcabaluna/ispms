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
        setRequesterName,
        setSupervisorName,
        updateQuantity,
        removeItem,
        checkout,
        isProcessing,
    } = useOrders({ employees, selectedItem, onItemAdded });

    return (
        <section className="w-full p-8 bg-white rounded-2xl shadow-lg border border-sky-200">
            <OrdersForm
                employees={employees}
                requesterName={requesterName}
                supervisorName={supervisorName}
                setRequesterName={setRequesterName}
                setSupervisorName={setSupervisorName}
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
                    className="text-lg px-6 py-3 bg-sky-700 text-white hover:bg-sky-800 disabled:opacity-50 flex items-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <span className="animate-spin mr-2">⏳</span>
                            Processing...
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="w-5 h-5" />
                            Checkout
                        </>
                    )}
                </Button>
            </div>
        </section>
    );
};

export default Orders;
