"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table-functions/DataTableColumnHeader";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { router } from "@inertiajs/react";

const handleRisnoUpdate = (e, empnumber, risno) => {
    e.preventDefault();
    router.put(route("risno.update", { empnumber }), {
        risno,
    });
};

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
        accessorKey: "empNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Employee Number" />
        ),
    },
    {
        id: "fullname",
        accessorFn: (row) => {
            const suffix = row.nameExtension ? `, ${row.nameExtension}` : "";
            const middleInitial = row.middlename
                ? ` ${row.middlename.charAt(0)}.`
                : "";
            return `${row.surname}, ${row.firstname}${suffix}${middleInitial}`;
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Employee Name" />
        ),
    },
    {
        accessorKey: "risno",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="RIS Number" />
        ),
        cell: ({ row }) => {
            const [risno, setRisno] = useState(row.original.risno ?? "");

            return (
                <Input
                    value={risno}
                    onChange={(e) => setRisno(e.target.value)}
                    className="h-7 px-1 py-0.5 text-xs w-20"
                />
            );
        },
    },
];
