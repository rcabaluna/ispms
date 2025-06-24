import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ToUploadItemsTable = ({ excelData }) => {
    if (!excelData || excelData.length === 0) {
        return <div className="text-center"></div>;
    }

    return (
        <div className="relative border rounded overflow-hidden">
            <Table className="table-fixed w-full">
                <TableHeader className="bg-gray-100 sticky top-0 z-10">
                    <TableRow>
                        <TableHead className="w-1/6">Stock No.</TableHead>
                        <TableHead className="w-1/12 text-center">
                            Quantity
                        </TableHead>
                        <TableHead className="w-1/2">Item</TableHead>
                        <TableHead className="w-1/12">UOM</TableHead>
                        <TableHead className="w-1/6 text-right">
                            Unit Cost
                        </TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
            <div className="max-h-64 overflow-y-auto">
                <Table className="table-fixed w-full">
                    <TableBody>
                        {excelData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-1/6">
                                    {row.stock_no}
                                </TableCell>
                                <TableCell className="w-1/12 text-center">
                                    {row.quantity}
                                </TableCell>
                                <TableCell className="w-1/2">
                                    {row.item}
                                </TableCell>
                                <TableCell className="w-1/12">
                                    {row.uom}
                                </TableCell>
                                <TableCell className="w-1/6 text-right">
                                    {row.unit_cost}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ToUploadItemsTable;
