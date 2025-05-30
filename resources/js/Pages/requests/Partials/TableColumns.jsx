"use client";

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
];
