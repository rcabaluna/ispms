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
            <div
                className="sticky top-0 z-10 pb-2 pt-1 border-b"
                style={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                }}
            >
                <Input
                    type="text"
                    placeholder="Search items..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="focus:ring-sky-500 focus:border-sky-500"
                    style={{
                        borderColor: "hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                    }}
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow
                        style={{
                            backgroundColor: "hsl(var(--secondary))",
                            color: "hsl(var(--secondary-foreground))",
                        }}
                    >
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
                                className="transition-colors"
                                style={{
                                    cursor:
                                        item.quantity > 0
                                            ? "pointer"
                                            : "not-allowed",
                                    opacity: item.quantity > 0 ? 1 : 0.6,
                                    backgroundColor:
                                        selectedItemId === item.stock_no
                                            ? "hsl(var(--secondary))"
                                            : "transparent",
                                }}
                                onMouseEnter={(e) => {
                                    if (
                                        item.quantity > 0 &&
                                        selectedItemId !== item.stock_no
                                    ) {
                                        e.currentTarget.style.backgroundColor =
                                            "hsl(var(--muted))";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (
                                        item.quantity > 0 &&
                                        selectedItemId !== item.stock_no
                                    ) {
                                        e.currentTarget.style.backgroundColor =
                                            "transparent";
                                    }
                                }}
                            >
                                <TableCell
                                    style={{
                                        color: "hsl(var(--primary-foreground))",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: "500",
                                            color: "hsl(var(--primary))",
                                        }}
                                    >
                                        {item.item}
                                    </span>
                                    <br />
                                    <span
                                        style={{
                                            fontSize: "0.75rem",
                                            color: "hsl(var(--muted-foreground))",
                                        }}
                                    >
                                        Stock No: {item.stock_no} &mdash;{" "}
                                        {item.quantity > 0 ? (
                                            <>
                                                Qty: {item.quantity}{" "}
                                                {item.uom_shorthand}.
                                            </>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "hsl(var(--destructive))",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                Out of stock
                                            </span>
                                        )}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                className="text-center italic"
                                style={{
                                    color: "hsl(var(--muted-foreground))",
                                }}
                            >
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
