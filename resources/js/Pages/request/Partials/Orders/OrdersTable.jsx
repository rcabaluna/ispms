import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const OrdersTable = ({ items, updateQuantity, removeItem }) => {
    return (
        <div
            className="overflow-x-auto rounded-sm shadow-sm border"
            style={{ borderColor: "hsl(var(--border))" }}
        >
            <Table
                className="min-w-full"
                style={{ backgroundColor: "hsl(var(--card))" }}
            >
                <TableHeader>
                    <TableRow
                        style={{
                            backgroundColor: "hsl(var(--secondary))",
                            color: "hsl(var(--secondary-foreground))",
                            fontWeight: "600",
                        }}
                    >
                        <TableHead className="py-3 px-6">Item</TableHead>
                        <TableHead className="py-3 px-6 w-48 text-center">
                            Quantity
                        </TableHead>
                        <TableHead className="py-3 px-6 w-24 text-center"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length ? (
                        items.map((item, idx) => (
                            <TableRow key={item.stock_no}>
                                <TableCell
                                    className="py-4 px-6"
                                    style={{ color: "hsl(var(--foreground))" }}
                                >
                                    <div>
                                        <span style={{ fontWeight: "600" }}>
                                            {item.item}
                                        </span>
                                        <br />
                                        <span
                                            style={{
                                                color: "hsl(var(--muted-foreground))",
                                                fontSize: "0.875rem",
                                            }}
                                        >
                                            Available: {item.quantity}{" "}
                                            {item.uom_shorthand}.
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-center">
                                    <div
                                        className="inline-flex items-center border rounded-md"
                                        style={{
                                            borderColor: "hsl(var(--border))",
                                            backgroundColor:
                                                "hsl(var(--muted))",
                                        }}
                                    >
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-l-md border-none"
                                            style={{
                                                color: "hsl(var(--primary))",
                                            }}
                                            onClick={() =>
                                                updateQuantity(idx, -1)
                                            }
                                            disabled={
                                                item.requestedQuantity <= 1
                                            }
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.backgroundColor =
                                                    "hsl(var(--primary))")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.backgroundColor =
                                                    "transparent")
                                            }
                                        >
                                            –
                                        </Button>
                                        <span
                                            className="w-10 text-lg text-center"
                                            style={{
                                                color: "hsl(var(--foreground))",
                                            }}
                                        >
                                            {item.requestedQuantity}
                                        </span>
                                        <Button
                                            size="icon"
                                            className="rounded-r-s border-none"
                                            style={{
                                                backgroundColor:
                                                    "hsl(var(--primary))",
                                                color: "hsl(var(--primary-foreground))",
                                            }}
                                            onClick={() =>
                                                updateQuantity(idx, 1)
                                            }
                                            disabled={
                                                item.requestedQuantity >=
                                                item.quantity
                                            }
                                            onMouseEnter={(e) => (
                                                (e.currentTarget.style.backgroundColor =
                                                    "hsl(var(--primary-foreground))"),
                                                (e.currentTarget.style.color =
                                                    "hsl(var(--primary))")
                                            )}
                                            onMouseLeave={(e) => (
                                                (e.currentTarget.style.backgroundColor =
                                                    "hsl(var(--primary))"),
                                                (e.currentTarget.style.color =
                                                    "hsl(var(--primary-foreground))")
                                            )}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(idx)}
                                        style={{
                                            color: "hsl(var(--destructive))",
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.color =
                                                "hsl(var(--destructive-foreground))")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.color =
                                                "hsl(var(--destructive))")
                                        }
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center py-6 italic"
                                style={{
                                    color: "hsl(var(--muted-foreground))",
                                }}
                            >
                                No items in cart.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrdersTable;
