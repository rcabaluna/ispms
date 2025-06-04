"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useForm } from "@inertiajs/react";

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
        cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
        accessorKey: "stock_no",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stock Number" />
        ),
    },
    {
        accessorKey: "total_quantity",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Total Quantity (Stock-In)"
            />
        ),
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("total_quantity")}</div>
        ),
    },
    {
        accessorKey: "served_quantity",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Served Quantity (Stock-Out)"
            />
        ),
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("served_quantity")}</div>
        ),
    },
    {
        accessorKey: "remaining_quantity",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Remaining Quantity" />
        ),
        cell: ({ row }) => (
            <div className="text-center">
                {row.getValue("remaining_quantity")}
            </div>
        ),
    },
    {
        accessorKey: "item",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Item" />
        ),
    },
    {
        accessorKey: "average_cost",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Average Cost" />
        ),
        cell: ({ row }) => {
            const value = row.getValue("average_cost");
            const formattedValue = Number.isInteger(value)
                ? `${value}.00`
                : value;
            return <div className="text-right">{formattedValue}</div>;
        },
    },
];
