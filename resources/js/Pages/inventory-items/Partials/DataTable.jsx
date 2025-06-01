"use client";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import { DataTablePagination } from "@/Components/table-functions/DataTablePagination";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { router } from "@inertiajs/react";
import axios from "axios";

export function DataTable({ columns, data }) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [itemsBreakdown, setItemsBreakdown] = useState([]);
    const [selectedStockNo, setSelectedStockNo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            globalFilter,
            columnVisibility,
            rowSelection,
        },
        globalFilterFn: (row, columnId, filterValue) => {
            return String(row.getValue(columnId))
                .toLowerCase()
                .includes(filterValue.toLowerCase());
        },
    });

    useEffect(() => {
        if (!selectedStockNo) return;

        setIsLoading(true); // Start loading
        axios
            .post(route("items.breakdown", { stock_no: selectedStockNo }))
            .then((response) => {
                setItemsBreakdown(response.data);
            })
            .catch((error) => {
                console.error("Error fetching item breakdown:", error);
            })
            .finally(() => {
                setIsLoading(false); // End loading
            });
    }, [selectedStockNo]);

    return (
        <>
            {/* Compact search bar */}
            <div className="flex items-center gap-1 py-2">
                <Label htmlFor="search" className="text-sm">
                    Search:
                </Label>
                <Input
                    id="search"
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-xs text-sm px-2 py-1"
                />
            </div>

            {/* Table container with compact styling */}
            <div className="rounded-md border overflow-x-auto">
                <Table className="text-sm">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="h-6">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="px-2 py-1"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef
                                                    .header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="h-6">
                                    {row.getVisibleCells().map((cell) => {
                                        const isItemColumn =
                                            cell.column.id === "item";

                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className="px-2 py-1 text-sm"
                                            >
                                                {isItemColumn ? (
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <button
                                                                className="underline text-blue-600 hover:text-blue-800 text-sm"
                                                                onClick={() =>
                                                                    setSelectedStockNo(
                                                                        row
                                                                            .original
                                                                            .stock_no
                                                                    )
                                                                }
                                                            >
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext()
                                                                )}
                                                            </button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[700px] text-sm">
                                                            <p className="text-sm font-medium">
                                                                Item Details
                                                            </p>
                                                            <div className="mt-2 text-xs">
                                                                {isLoading ? (
                                                                    <div className="text-center py-2">
                                                                        Fetching
                                                                        data...
                                                                    </div>
                                                                ) : (
                                                                    <Table className="table-fixed w-full text-sm">
                                                                        <TableHeader className="bg-gray-100 sticky top-0 z-10">
                                                                            <TableRow>
                                                                                <TableHead className="w-1/4">
                                                                                    PO
                                                                                    Number
                                                                                </TableHead>
                                                                                <TableHead className="w-1/4 text-center">
                                                                                    Quantity
                                                                                </TableHead>
                                                                                <TableHead className="w-1/4">
                                                                                    Unit
                                                                                    Cost
                                                                                </TableHead>
                                                                                <TableHead className="w-1/4 text-right">
                                                                                    Date
                                                                                    Uploaded
                                                                                </TableHead>
                                                                            </TableRow>
                                                                        </TableHeader>
                                                                        <TableBody>
                                                                            {itemsBreakdown.map(
                                                                                (
                                                                                    item
                                                                                ) => (
                                                                                    <TableRow
                                                                                        key={
                                                                                            item.invitemsid
                                                                                        }
                                                                                        className="h-6"
                                                                                    >
                                                                                        <TableCell className="w-1/4">
                                                                                            <b>
                                                                                                {" "}
                                                                                                {
                                                                                                    item.POnumber
                                                                                                }
                                                                                            </b>
                                                                                        </TableCell>
                                                                                        <TableCell className="w-1/4 text-center">
                                                                                            {
                                                                                                item.quantity
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="w-1/4">
                                                                                            {
                                                                                                item.unit_cost
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="w-1/4 text-right">
                                                                                            {new Date(
                                                                                                item.created_at
                                                                                            ).toLocaleDateString(
                                                                                                "en-US",
                                                                                                {
                                                                                                    year: "numeric",
                                                                                                    month: "long",
                                                                                                    day: "numeric",
                                                                                                }
                                                                                            )}
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                )
                                                                            )}
                                                                        </TableBody>
                                                                    </Table>
                                                                )}
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                ) : (
                                                    flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="h-6">
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-16 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="mt-2">
                <DataTablePagination table={table} />
            </div>
        </>
    );
}
