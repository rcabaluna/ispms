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
        <div className="overflow-x-auto rounded-lg shadow-sm border border-sky-300">
            <Table className="min-w-full bg-white">
                <TableHeader>
                    <TableRow className="bg-sky-100 text-sky-900 font-semibold">
                        <TableHead className="py-3 px-6">Stock No</TableHead>
                        <TableHead className="py-3 px-6">Item</TableHead>
                        <TableHead className="py-3 px-6 w-48 text-center">
                            Quantity
                        </TableHead>
                        <TableHead className="py-3 px-6 w-24 text-center">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.length ? (
                        items.map((item, idx) => (
                            <TableRow key={item.invitemsid}>
                                <TableCell className="py-4 px-6 text-sky-800">
                                    {item.stock_no}
                                </TableCell>
                                <TableCell className="py-4 px-6">
                                    <div>
                                        <span className="font-semibold">
                                            {item.item}
                                        </span>
                                        <br />
                                        <span className="text-sm text-gray-500">
                                            Available: {item.quantity}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 px-6 text-center">
                                    <div className="inline-flex items-center border rounded-md border-sky-300 bg-sky-50">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-l-md border-none text-sky-700 hover:bg-sky-100"
                                            onClick={() =>
                                                updateQuantity(idx, -1)
                                            }
                                            disabled={
                                                item.requestedQuantity <= 1
                                            }
                                        >
                                            –
                                        </Button>
                                        <span className="w-10 text-lg text-center">
                                            {item.requestedQuantity}
                                        </span>
                                        <Button
                                            size="icon"
                                            className="rounded-r-md border-none bg-sky-600 text-white hover:bg-sky-700"
                                            onClick={() =>
                                                updateQuantity(idx, 1)
                                            }
                                            disabled={
                                                item.requestedQuantity >=
                                                item.quantity
                                            }
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
                                        className="text-red-600 hover:text-red-700"
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
                                className="text-center py-6 text-gray-400 italic"
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
