import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableBody,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Items = ({ items, onSelectItem }) => {
    const [search, setSearch] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);

    const filteredItems = items.filter(
        (item) =>
            item.item.toLowerCase().includes(search.toLowerCase()) ||
            item.stock_no.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (item) => {
        setSelectedItemId(item.stock_no);
        onSelectItem?.(item);
    };

    return (
        <div className="relative h-full">
            {/* Sticky Search */}
            <div className="sticky top-0 z-10 bg-white pb-2 pt-1 border-b border-sky-100">
                <Input
                    type="text"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-sky-300 focus:ring-sky-500 focus:border-sky-500"
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="bg-sky-100 text-sky-800">
                        <TableHead>Item</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <TableRow
                                key={item.stock_no}
                                onClick={() =>
                                    item.quantity > 0 && handleSelect(item)
                                }
                                className={`transition-colors ${
                                    item.quantity > 0
                                        ? "cursor-pointer hover:bg-sky-50"
                                        : "opacity-60 cursor-not-allowed"
                                } ${
                                    selectedItemId === item.stock_no
                                        ? "bg-sky-200"
                                        : ""
                                }`}
                            >
                                <TableCell className="text-sm text-sky-700">
                                    <span className="font-medium">
                                        {item.item}
                                    </span>
                                    <br />
                                    <span className="text-xs">
                                        Stock No: {item.stock_no} &mdash;{" "}
                                        {item.quantity > 0 ? (
                                            <>Qty: {item.quantity}</>
                                        ) : (
                                            <span className="text-red-600 font-semibold">
                                                Out of stock
                                            </span>
                                        )}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="text-center text-gray-500 italic">
                                No items found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default Items;
