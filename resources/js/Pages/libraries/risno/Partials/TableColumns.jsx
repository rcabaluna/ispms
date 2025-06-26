"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table-functions/DataTableColumnHeader";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { useDebouncedCallback } from "use-debounce";

const useRisnoUpdate = () => {
    return useDebouncedCallback((empnumber, risno) => {
        router.put(route("risno.update", { empnumber }), {
            risno,
        });
    }, 500);
};

export const columns = [
    {
        id: "rowNumber",
        header: "#",
        cell: ({ row }) => row.index + 1, // display starts from 1
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
            const debouncedUpdate = useRisnoUpdate();

            return (
                <Input
                    value={risno}
                    onChange={(e) => {
                        const newRisno = e.target.value;
                        setRisno(newRisno);
                        debouncedUpdate(row.original.empNumber, newRisno);
                    }}
                    className="h-7 px-1 py-0.5 text-xs w-20"
                />
            );
        },
    },
];
