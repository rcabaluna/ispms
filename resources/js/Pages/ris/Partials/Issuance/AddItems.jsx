import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import { ShowToast } from "@/Layouts/ShowToast";

const AddItems = ({
    openDialog,
    handleClose,
    employee,
    month,
    year,
    refreshRISData,
}) => {
    const [rows, setRows] = useState([
        {
            item: "",
            stock_no: "",
            quantity: "",
            month: month,
            year: year,
            warning: false,
        },
    ]);
    const [availableItems, setAvailableItems] = useState([]);

    useEffect(() => {
        const fetchAvailableItems = async () => {
            try {
                const response = await fetch("/inventory/items/available");
                if (!response.ok) throw new Error("Failed to fetch items");
                const data = await response.json();
                setAvailableItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchAvailableItems();
    }, []);

    const handleAddRow = () => {
        setRows([
            ...rows,
            {
                item: "",
                stock_no: "",
                quantity: "",
                month: month,
                year: year,
                warning: false,
            },
        ]);
    };

    const handleRemoveRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const handleChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;

        // Capture stock_no when item changes
        if (field === "item") {
            const selectedItem = availableItems.find(
                (item) => item.item === value
            );
            newRows[index].stock_no = selectedItem?.stock_no || "";
        }

        // Handle validation if quantity changes
        if (field === "quantity") {
            const selectedItem = availableItems.find(
                (item) => item.item === newRows[index].item
            );
            const remaining = selectedItem?.remaining_quantity ?? 0;
            const quantityNum = parseInt(value, 10) || 0;

            const usedQuantity = rows.reduce((sum, row, idx) => {
                if (idx !== index && row.item === newRows[index].item) {
                    return sum + (parseInt(row.quantity) || 0);
                }
                return sum;
            }, 0);

            const totalRequested = quantityNum + usedQuantity;

            if (quantityNum <= 0) {
                newRows[index].warning = "Quantity must be greater than zero.";
            } else if (totalRequested > remaining) {
                newRows[index].warning = "Quantity exceeds available stock.";
            } else {
                newRows[index].warning = false;
            }
        }

        setRows(newRows);
    };

    const getRemainingQuantity = (itemName, currentIndex) => {
        const selectedItem = availableItems.find(
            (item) => item.item === itemName
        );
        if (!selectedItem) return "-";

        const originalRemaining = selectedItem.remaining_quantity;

        const usedQuantity = rows.reduce((sum, row, idx) => {
            if (row.item === itemName && idx !== currentIndex) {
                return sum + (parseInt(row.quantity) || 0);
            }
            return sum;
        }, 0);

        const currentQty = parseInt(rows[currentIndex].quantity) || 0;

        const remaining = originalRemaining - usedQuantity - currentQty;
        return remaining < 0 ? 0 : remaining;
    };

    const getMonthName = (monthNumber) =>
        new Date(2000, monthNumber - 1).toLocaleString("default", {
            month: "long",
        });

    const hasWarnings = rows.some((row) => row.warning);

    const onSubmit = () => {
        // Filter out rows with missing item or invalid quantity
        const validRows = rows.filter(
            (row) =>
                row.item &&
                row.stock_no &&
                parseInt(row.quantity) > 0 &&
                !row.warning
        );

        if (validRows.length === 0) {
            alert("Please fill in at least one valid item.");
            return;
        }

        const payload = {
            items: validRows.map((row) => ({
                empNumber: employee?.empNumber,
                stock_no: row.stock_no,
                quantity: parseInt(row.quantity),
                month: month,
                year: year,
            })),
        };

        router.post(route("ris.store"), payload, {
            preserveScroll: true,
            onSuccess: (response) => {
                ShowToast({
                    title: "Success!",
                    description: response.props.flash.message,
                    className: "bg-green-500 text-white",
                });
                handleClose(false);
                refreshRISData?.();
            },
        });
    };

    return (
        <Dialog open={openDialog} onOpenChange={handleClose}>
            <DialogContent className="max-w-5xl w-full">
                <DialogHeader>
                    <DialogTitle>
                        Issue item/s for{" "}
                        {employee
                            ? `${employee.firstname} ${employee.surname}${
                                  employee.nameExtension
                                      ? " " + employee.nameExtension
                                      : ""
                              }`
                            : "Select an employee"}
                        .
                    </DialogTitle>
                    <DialogDescription>
                        Issue items for the month of{" "}
                        {month && year
                            ? `${getMonthName(Number(month))} ${year}`
                            : "—"}
                        .
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end mb-2">
                    <Button size="sm" onClick={handleAddRow}>
                        Add Item
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Item</TableHead>
                            <TableHead className="text-center w-1/6">
                                Stock No
                            </TableHead>
                            <TableHead className="text-center w-1/6">
                                Remaining
                            </TableHead>
                            <TableHead className="w-1/6">Quantity</TableHead>
                            <TableHead className="text-right w-1/6">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, index) => {
                            const remaining = getRemainingQuantity(
                                row.item,
                                index
                            );
                            return (
                                <TableRow key={index}>
                                    <TableCell className="align-top">
                                        <Input
                                            list="available-items"
                                            value={row.item}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "item",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full"
                                        />
                                        {row.warning && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {row.warning}
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center align-top pt-3">
                                        {row.stock_no || "-"}
                                    </TableCell>
                                    <TableCell className="text-center align-top pt-3">
                                        {remaining}
                                    </TableCell>
                                    <TableCell className="align-top pt-2">
                                        <Input
                                            type="number"
                                            value={row.quantity}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                            className={
                                                row.warning
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="text-right align-top pt-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleRemoveRow(index)
                                            }
                                            className="text-red-500 hover:bg-red-100"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <datalist id="available-items">
                    {availableItems.map((itemObj, idx) => (
                        <option
                            key={idx}
                            value={itemObj.item}
                            label={`[Stock No: ${itemObj.stock_no}]`}
                        />
                    ))}
                </datalist>

                <div className="flex justify-end mt-6 gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => handleClose(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} disabled={hasWarnings}>
                        Issue Items
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddItems;
