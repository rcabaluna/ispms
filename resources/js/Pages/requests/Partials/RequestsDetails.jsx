import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const RequestsDetails = ({ selectedRequest }) => {
    const [requestDetails, setRequestDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scratchedItems, setScratchedItems] = useState([]);
    const [isAcknowledged, setIsAcknowledged] = useState(false);

    useEffect(() => {
        if (!selectedRequest) {
            setRequestDetails(null);
            return;
        }

        const controller = new AbortController();
        const { requestsummaryid } = selectedRequest;

        const fetchRequestDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `/inventory/requests/details/${requestsummaryid}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setRequestDetails(data);
                setScratchedItems([]);
                setIsAcknowledged(false); // reset when changing request
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch request details:", error);
                    setRequestDetails(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRequestDetails();

        return () => controller.abort();
    }, [selectedRequest]);

    const toggleScratch = (index) => {
        if (!isAcknowledged) return;

        setScratchedItems((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const allItemsScratched =
        requestDetails?.items?.length > 0 &&
        scratchedItems.length === requestDetails.items.length;

    if (!selectedRequest) {
        return <div className="text-gray-500">No request selected</div>;
    }

    if (loading) {
        return <div className="text-gray-500">Loading request details...</div>;
    }

    if (!requestDetails) {
        return <div className="text-red-500">Failed to load request details.</div>;
    }

    const { purpose, requestdate, requester_details, items } = requestDetails;

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-medium">Requests</p>
                {!isAcknowledged && (
                    <Button onClick={() => setIsAcknowledged(true)}>Acknowledge</Button>
                )}
                {isAcknowledged && allItemsScratched && (
                    <Button onClick={() => alert("Marked as served!")}>
                        Mark as Served
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                <div>
                    <h2 className="text-xl font-bold">Request Details</h2>
                    <p>
                        <strong>Purpose:</strong> {purpose}
                    </p>
                    <p>
                        <strong>Requester:</strong>{" "}
                        {requester_details?.firstname} {requester_details?.surname}{" "}
                        {requester_details?.nameExtension}
                    </p>
                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(requestdate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                        })}
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Requested Items</h3>
                    {!isAcknowledged && (
                        <p className="text-sm text-gray-500 mb-2">
                            Click “Acknowledge” to start serving items.
                        </p>
                    )}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Requested Qty</TableHead>
                                <TableHead>Issued Qty</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items?.map((item, idx) => {
                                const isScratched = scratchedItems.includes(idx);
                                return (
                                    <TableRow
                                        key={idx}
                                        onClick={() => toggleScratch(idx)}
                                        className={`cursor-pointer ${!isAcknowledged ? "opacity-50 pointer-events-none" : ""}`}
                                    >
                                        <TableCell className={isScratched ? "line-through text-gray-500" : ""}>
                                            {item.item}
                                        </TableCell>
                                        <TableCell className={isScratched ? "line-through text-gray-500" : ""}>
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell className={isScratched ? "line-through text-gray-500" : ""}>
                                            {item.issued_quantity}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default RequestsDetails;
