"use client";

import { useState } from "react";
import { router } from "@inertiajs/react";
import { MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/table-functions/DataTableColumnHeader";
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

import { ShowToast } from "@/Layouts/ShowToast";

export const columns = [
    {
        id: "rowNumber",
        header: "#",
        cell: ({ row }) => row.index + 1,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="OUM" />
        ),
    },
    {
        accessorKey: "abbreviation",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shorthand" />
        ),
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => {
            const uom = row.original;
            const [open, setOpen] = useState(false);
            const [editOpen, setEditOpen] = useState(false);

            // Local state for form inputs
            const [name, setName] = useState(uom.name || "");
            const [abbreviation, setAbbreviation] = useState(
                uom.abbreviation || ""
            );

            const confirmDelete = (e) => {
                // Implement your delete logic here
            };

            const handleEdit = () => {
                router.put(
                    route("uom.update", { uomid: uom.uomid }),
                    { name, abbreviation },
                    {
                        onSuccess: (response) => {
                            ShowToast({
                                title: "Success!",
                                description: "UOM updated successfully!",
                                className: "bg-green-500 text-white",
                            });
                            setEditOpen(false);
                        },
                        onError: (errors) => {
                            console.log(errors);
                            ShowToast({
                                title: "Error!",
                                description: errors.message,
                                className: "bg-red-500 text-white",
                            });
                        },
                    }
                );
            };

            // Sync local state when dialog opens, so form inputs are up-to-date with current row
            const openEditDialog = () => {
                setName(uom.name || "");
                setAbbreviation(uom.abbreviation || "");
                setEditOpen(true);
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
                                    setOpen(false);
                                    openEditDialog();
                                }}
                            >
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem>View Items</DropdownMenuItem>
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
                                            onClick={confirmDelete}
                                            className="bg-red-500"
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
                                <DialogTitle>Edit Unit of Measure</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Unit of Measure
                                    </Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Enter UOM"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="abbreviation">
                                        Shorthand
                                    </Label>
                                    <Input
                                        id="abbreviation"
                                        value={abbreviation}
                                        onChange={(e) =>
                                            setAbbreviation(e.target.value)
                                        }
                                        placeholder="Enter Shorthand"
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
                                <Button onClick={handleEdit}>Update</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
    },
];
