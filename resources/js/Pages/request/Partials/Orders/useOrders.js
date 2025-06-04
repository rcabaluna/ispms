import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const useOrders = ({ employees, selectedItem, onItemAdded }) => {
    const [requesterName, setRequesterName] = useState("");
    const [supervisorName, setSupervisorName] = useState("");
    const [requester, setRequester] = useState(null);
    const [supervisor, setSupervisor] = useState(null);
    const [purpose, setPurpose] = useState("");
    const [items, setItems] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const findEmployee = (fullName) =>
        employees.find((emp) => {
            const name = [
                emp.firstname,
                emp.middleInitial ? emp.middleInitial + "." : "",
                emp.surname,
                emp.nameExtension,
            ]
                .filter(Boolean)
                .join(" ");
            return name === fullName;
        });

    useEffect(() => {
        setRequester(findEmployee(requesterName));
    }, [requesterName]);

    useEffect(() => {
        setSupervisor(findEmployee(supervisorName));
    }, [supervisorName]);

    useEffect(() => {
        if (selectedItem) {
            const exists = items.find(
                (i) => i.invitemsid === selectedItem.invitemsid
            );
            if (!exists) {
                setItems((prev) => [
                    ...prev,
                    { ...selectedItem, requestedQuantity: 1 },
                ]);
                onItemAdded?.();
            }
        }
    }, [selectedItem]);

    const updateQuantity = (index, delta) => {
        setItems((prev) =>
            prev.map((item, idx) => {
                if (idx !== index) return item;
                const maxQty = item.quantity;
                const newQty = item.requestedQuantity + delta;
                return {
                    ...item,
                    requestedQuantity: Math.max(1, Math.min(newQty, maxQty)),
                };
            })
        );
    };

    const removeItem = (index) => {
        setItems((prev) => prev.filter((_, idx) => idx !== index));
    };

    const checkout = () => {
        setIsProcessing(true);
        router.post(
            route("request.store"),
            {
                summary: {
                    requester: requester?.empNumber || null,
                    supervisor: supervisor?.empNumber || null,
                    purpose: purpose || null,
                },
                details: items,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setItems([]);
                    setRequesterName("");
                    setSupervisorName("");
                    alert("Order submitted successfully!");
                    setIsProcessing(false);
                },
                onError: (errors) => {
                    console.error("Checkout error:", errors);
                    alert("Failed to submit order.");
                    setIsProcessing(false);
                },
            }
        );
    };

    return {
        requester,
        supervisor,
        requesterName,
        supervisorName,
        setRequesterName,
        setSupervisorName,
        purpose,
        setPurpose,
        items,
        updateQuantity,
        removeItem,
        checkout,
        isProcessing,
    };
};

export default useOrders;
