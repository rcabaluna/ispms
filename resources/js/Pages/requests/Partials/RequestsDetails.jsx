import React, { useEffect, useState } from "react";
import {
    Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const RequestsDetails = ({ selectedRequest, setSelectedRequest, setRequestsData, requestsData }) => {
    const [requestDetails, setRequestDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scratchedItems, setScratchedItems] = useState([]);
    const [remarks, setRemarks] = useState("");
    const [checkAll, setCheckAll] = useState(false);

    const isAcknowledged = selectedRequest?.xstatus === "Acknowledged";

    useEffect(() => {
        if (!selectedRequest) return setRequestDetails(null);
        const controller = new AbortController();
        const { requestsummaryid } = selectedRequest;

        const fetchRequestDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/inventory/requests/details/${requestsummaryid}`, {
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error(`Error ${response.status}`);
                const data = await response.json();
                setRequestDetails(data);
                setScratchedItems([]);
                setCheckAll(false);
            } catch (error) {
                if (error.name !== "AbortError") console.error("Fetch error:", error);
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
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const toggleAll = () => {
        if (!isAcknowledged) return;
        const allIndexes = requestDetails?.items?.map((_, i) => i) || [];
        setScratchedItems(checkAll ? [] : allIndexes);
        setCheckAll(!checkAll);
    };

    const handleAcknowledge = async () => {
        try {
            const res = await fetch(`/inventory/requests/acknowledge/${selectedRequest.requestsummaryid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                },
            });
            if (!res.ok) throw new Error("Acknowledge failed");

            setRequestsData((prev) =>
                prev.map((r) =>
                    r.requestsummaryid === selectedRequest.requestsummaryid
                        ? { ...r, xstatus: "Acknowledged" }
                        : r
                )
            );

            setSelectedRequest((prev) => ({ ...prev, xstatus: "Acknowledged" }));
        } catch (err) {
            console.error(err);
            alert("Error acknowledging request");
        }
    };

    const handleMarkAsServed = async () => {
        try {
            const res = await fetch(`/inventory/requests/serve/${selectedRequest.requestsummaryid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ remarks }),
            });
            if (!res.ok) throw new Error("Serve failed");

            setRequestsData((prev) =>
                prev.map((r) =>
                    r.requestsummaryid === selectedRequest.requestsummaryid
                        ? { ...r, xstatus: "Served" }
                        : r
                )
            );

            alert("Marked as served");
        } catch (err) {
            console.error(err);
            alert("Error marking as served");
        }
    };

    if (!selectedRequest) return <div className="text-sm text-muted-foreground">No request selected.</div>;
    if (loading) return <div className="text-sm text-muted-foreground">Loading...</div>;
    if (!requestDetails) return <div className="text-sm text-destructive">Failed to load details.</div>;

    const { items } = requestDetails;
    const requester = selectedRequest.requester_details;
    const supervisor = selectedRequest.supervisor_details;

    const formatName = (person) =>
        [person?.firstname, person?.middleInitial && `${person.middleInitial}.`, person?.surname, person?.nameExtension]
            .filter(Boolean).join(" ");

    return (
        <div className="border bg-background p-4 shadow-sm space-y-4 text-sm">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-primary">Request Summary</h2>
                {!isAcknowledged ? (
                    <Button onClick={handleAcknowledge}>Acknowledge</Button>
                ) : (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">Mark as Served</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Serve</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Proceed to mark this request as served? This action is final.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleMarkAsServed}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            <Separator />

            <div className="space-y-1">
                <p><strong>Purpose:</strong> {selectedRequest.purpose}</p>
                <p><strong>Requester:</strong> {formatName(requester)}</p>
                <p><strong>Supervisor:</strong> {formatName(supervisor)}</p>
                <p><strong>Request Date:</strong> {new Date(selectedRequest.requestdate).toLocaleDateString()}</p>
            </div>

            <Separator />

            <div>
                <h3 className="font-semibold text-primary mb-2">Items</h3>
                {!isAcknowledged && (
                    <p className="text-xs text-muted-foreground mb-2">
                        Click “Acknowledge” to serve items.
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
                            <TableHead>Issued</TableHead>
                            <TableHead>Requested</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.map((item, idx) => {
                            const isScratched = scratchedItems.includes(idx);
                            const diff = item.issued_quantity - item.quantity;
                            const isWarning = diff <= 5 && diff > 0;
                            const isDanger = diff <= 0;

                            const rowStyle = cn(
                                isDanger && "bg-red-50 text-red-700",
                                isWarning && "bg-yellow-50 text-yellow-700",
                                !isAcknowledged && "opacity-60"
                            );

                            const textStyle = cn(
                                isScratched && "line-through text-muted-foreground"
                            );

                            return (
                                <TableRow key={idx} className={cn("cursor-pointer", rowStyle)}>
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={isScratched}
                                            onCheckedChange={() => toggleScratch(idx)}
                                            disabled={!isAcknowledged}
                                        />
                                    </TableCell>
                                    <TableCell onClick={() => toggleScratch(idx)} className={textStyle}>
                                        {item.item}
                                    </TableCell>
                                    <TableCell onClick={() => toggleScratch(idx)} className={textStyle}>
                                        {item.issued_quantity}
                                    </TableCell>
                                    <TableCell onClick={() => toggleScratch(idx)} className={textStyle}>
                                        {item.quantity}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {isAcknowledged && (
                <>
                    <Separator />
                    <div className="space-y-1">
                        <label htmlFor="remarks" className="text-sm font-medium text-muted-foreground">
                            Remarks
                        </label>
                        <textarea
                            id="remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            className="w-full border bg-muted p-2 text-sm resize-y min-h-[80px] focus:ring-1 focus:ring-primary"
                            placeholder="Notes or instructions..."
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default RequestsDetails;
