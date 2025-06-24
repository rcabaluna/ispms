"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useForm, router } from "@inertiajs/react";

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

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table-functions/DataTableColumnHeader";
import { ShowToast } from "@/Layouts/ShowToast";

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
        accessorKey: "POnumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="PO Number" />
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date Uploaded" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"));
            const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            return <div>{formattedDate}</div>;
        },
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => {
            const stockin = row.original;
            const { delete: destroy } = useForm();
            const [open, setOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);
            const [PONumber, setPONumber] = useState("");

            const handleViewItems = () => {
                router.visit(`/inventory/stock-in/${stockin.stockinid}`);
            };

            const ConfirmDelete = () => {
                destroy(
                    route("stock-in.destroy", {
                        stock_in: stockin.stockinid,
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

            const handleEdit = (stockinid) => {
                router.put(
                    route("stock-in.update", {
                        stock_in: stockinid,
                    }),
                    {
                        ponumber: PONumber,
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
                            <DropdownMenuItem
                                onClick={() => {
                                    setPONumber(stockin.ponumber);
                                    setEditOpen(true);
                                    setOpen(false);
                                }}
                            >
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={handleViewItems}>
                                View Items
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
                                            onClick={ConfirmDelete}
                                            className="bg-red-500"
                                        >
                                            Confirm
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Edit Dialog outside DropdownMenu */}
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Stock-in Details</DialogTitle>
                                <DialogDescription>
                                    Edit the details of this stock-in entry.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="serial">PO Number</Label>
                                    <Input
                                        id="serial"
                                        value={PONumber}
                                        onChange={(e) =>
                                            setPONumber(e.target.value)
                                        }
                                        placeholder="xxxx-xx-xxxx"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="secondary"
                                    onClick={() => setEditOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleEdit(stockin.stockinid);
                                    }}
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
