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
import { Checkbox } from "@/components/ui/checkbox";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { router } from "@inertiajs/react";

const RequestsDetails = ({ selectedRequest }) => {
    const [requestDetails, setRequestDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scratchedItems, setScratchedItems] = useState([]);
    const [remarks, setRemarks] = useState("");
    const [checkAll, setCheckAll] = useState(false);

    const isAcknowledged = selectedRequest?.xstatus === "Acknowledged";

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
                    throw new Error(
                        `Error ${response.status}: ${response.statusText}`
                    );
                }

                const data = await response.json();
                setRequestDetails(data);
                setScratchedItems([]);
                setCheckAll(false);
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

    const toggleAll = () => {
        if (!isAcknowledged) return;
        if (checkAll) {
            setScratchedItems([]);
            setCheckAll(false);
        } else {
            const allIndexes = requestDetails?.items?.map((_, i) => i) || [];
            setScratchedItems(allIndexes);
            setCheckAll(true);
        }
    };

    const handleAcknowledge = async () => {
        try {
            const response = await fetch(
                `/inventory/requests/acknowledge/${selectedRequest.requestsummaryid}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to acknowledge request.");
            }

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error(error.message);
            alert("An error occurred while acknowledging the request.");
        }
    };

    const handleMarkAsServed = () => {
        alert(`Marked as served!\nRemarks: ${remarks}`);
        // You can send this to your API if needed
    };

    if (!selectedRequest) {
        return <div className="text-gray-500">No request selected</div>;
    }

    if (loading) {
        return <div className="text-gray-500">Loading request details...</div>;
    }

    if (!requestDetails) {
        return (
            <div className="text-red-500">Failed to load request details.</div>
        );
    }

    const { purpose, requestdate, requester_details, items } = requestDetails;

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-medium">Requests</p>
                {!isAcknowledged && (
                    <Button onClick={handleAcknowledge}>Acknowledge</Button>
                )}
                {isAcknowledged && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button>Mark as Served</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Confirm Mark as Served
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to mark this request
                                    as served? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleMarkAsServed}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                        {requester_details?.firstname}{" "}
                        {requester_details?.surname}{" "}
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
                                <TableHead>
                                    <Checkbox
                                        checked={checkAll}
                                        onCheckedChange={toggleAll}
                                        disabled={!isAcknowledged}
                                    />
                                </TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Requested Qty</TableHead>
                                <TableHead>Issued Qty</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items?.map((item, idx) => {
                                const isScratched =
                                    scratchedItems.includes(idx);
                                const qtyDiff =
                                    item.issued_quantity - item.quantity;
                                const isWarning = qtyDiff <= 5 && qtyDiff > 0;
                                const isDanger = qtyDiff <= 0;

                                const rowClass = `${
                                    isDanger ? "bg-red-100" : ""
                                } ${isWarning ? "bg-yellow-100" : ""}`;
                                const textClass = `${
                                    isScratched
                                        ? "line-through text-gray-500"
                                        : ""
                                } ${isDanger ? "text-red-500" : ""} ${
                                    isWarning ? "text-yellow-600" : ""
                                }`;

                                return (
                                    <TableRow
                                        key={idx}
                                        className={`cursor-pointer ${
                                            !isAcknowledged
                                                ? "opacity-50 pointer-events-none"
                                                : ""
                                        } ${rowClass}`}
                                    >
                                        <TableCell
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Checkbox
                                                checked={isScratched}
                                                onCheckedChange={() =>
                                                    toggleScratch(idx)
                                                }
                                                disabled={!isAcknowledged}
                                            />
                                        </TableCell>
                                        <TableCell
                                            onClick={() => toggleScratch(idx)}
                                            className={textClass}
                                        >
                                            {item.item}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => toggleScratch(idx)}
                                            className={textClass}
                                        >
                                            {item.issued_quantity}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => toggleScratch(idx)}
                                            className={textClass}
                                        >
                                            {item.quantity}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

                {isAcknowledged && (
                    <div className="mt-4">
                        <label
                            htmlFor="remarks"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Remarks:
                        </label>
                        <textarea
                            id="remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2 resize-y min-h-[100px]"
                            placeholder="Remarks"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default RequestsDetails;
