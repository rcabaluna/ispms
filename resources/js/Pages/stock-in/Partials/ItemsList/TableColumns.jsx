"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { router, useForm } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table-functions/DataTableColumnHeader";
import { ShowToast } from "@/Layouts/ShowToast";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "no",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="No." />
        ),
        cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
        accessorKey: "stock_no",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stock Number" />
        ),
    },
    {
        accessorKey: "quantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quantity" />
        ),
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("quantity")}</div>
        ),
    },
    {
        accessorKey: "item",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Item" />
        ),
    },
    {
        accessorKey: "unit_cost",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Unit Cost" />
        ),
        cell: ({ row }) => {
            const value = row.getValue("unit_cost");
            const formattedValue = Number.isInteger(value)
                ? `${value}.00`
                : value;
            return <div>{formattedValue}</div>;
        },
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => {
            const item = row.original;
            const { delete: destroy } = useForm();
            const [open, setOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);
            const [quantity, setQuantity] = useState(item.quantity);
            const [unitCost, setUnitCost] = useState(item.unit_cost);

            const ConfirmDelete = () => {
                destroy(
                    route("items.destroy", {
                        invitemsid: item.invitemsid,
                    }),
                    {
                        onSuccess: (response) => {
                            ShowToast({
                                title: "Success!",
                                description: response.props.flash.message,
                                className: "bg-green-500 text-white",
                            });
                            setOpen(false);
                        },
                        onError: (errors) => {
                            ShowToast({
                                title: "Request failed",
                                description: errors.message,
                                className: "bg-red-500 text-white",
                            });
                        },
                        onFinish: () => {
                            setOpen(false);
                        },
                    }
                );
            };

            const handleEdit = (invitemsid) => {
                router.put(
                    route("items.update", {
                        invitemsid: invitemsid,
                    }),
                    {
                        quantity: quantity,
                        unit_cost: unitCost,
                    },
                    {
                        onSuccess: (response) => {
                            ShowToast({
                                title: "Success!",
                                description: response.props.flash.message,
                                className: "bg-green-500 text-white",
                            });
                            setEditOpen(false);
                        },
                        onError: (errors) => {
                            if (errors.ponumber) {
                                ShowToast({
                                    title: "Duplicate PO Number",
                                    description: errors.ponumber,
                                    className: "bg-red-500 text-white",
                                });
                            } else {
                                ShowToast({
                                    title: "Request failed",
                                    description:
                                        "An unexpected error occurred.",
                                    className: "bg-red-500 text-white",
                                });
                            }
                        },
                    }
                );
            };

            return (
                <>
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setEditOpen(true)}>
                                Edit
                            </DropdownMenuItem>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete this entry.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bg-red-500"
                                            onClick={ConfirmDelete}
                                        >
                                            Confirm
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{item.item} </DialogTitle>
                                <DialogDescription>
                                    Edit the details of this item.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        defaultValue={item.quantity}
                                        onChange={(e) =>
                                            setQuantity(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unit_cost">Unit Cost</Label>
                                    <Input
                                        id="unit_cost"
                                        type="number"
                                        onChange={(e) =>
                                            setUnitCost(e.target.value)
                                        }
                                        defaultValue={item.unit_cost}
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setEditOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => handleEdit(item.invitemsid)}
                                >
                                    Update
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
    },
];
