import React from "react";

const RSMIDetails = ({ rsmi, month, year }) => {
    const totalAmount = rsmi.reduce((acc, item) => {
        const itemTotal = item.details.split("~").reduce((sum, detailStr) => {
            const parts = detailStr.split(";");
            const totalCost = parseFloat(parts[5]) || 0;
            return sum + totalCost;
        }, 0);
        return acc + itemTotal;
    }, 0);

    return (
        <div className="p-4 max-w-7xl mx-auto text-base">
            <table className="table-auto w-full border border-black border-collapse text-sm text-13">
                <thead>
                    <tr>
                        <td
                            className="text-center text-xl font-bold p-1 brdr-t brdr-l brdr-r text-16"
                            colSpan={8}
                        >
                            <b>REPORT OF SUPPLIES AND MATERIALS ISSUED</b>
                        </td>
                    </tr>
                    <tr className="brdr-l brdr-r">
                        <td colSpan={8} className="p-1">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td
                            colSpan={6}
                            className="p-1 font-semibold brdr-l text-left text-l text-12"
                        >
                            <b>
                                Entity Name: DEPARTMENT OF SCIENCE AND
                                TECHNOLOGY - 10
                            </b>
                        </td>
                        <td className="p-1 text-12 width-50" colSpan={1}>
                            <b>Serial No.:</b>
                        </td>
                        <td className="text-l p-1 brdr-r text-12">
                            <u></u>
                        </td>
                    </tr>
                    <tr className="brdr-l brdr-r">
                        <td className="p-1 font-semibold text-l" colSpan={2}>
                            <b>Fund Cluster:</b>
                        </td>
                        <td className="p-1 text-l" colSpan={4}></td>
                        <td className="p-1 font-semibold text-l" colSpan={1}>
                            <b>Date:</b>
                        </td>
                        <td className="text-l p-1 brdr-r" colSpan={1}>
                            {new Date().toLocaleDateString()}
                        </td>
                    </tr>
                    <tr className="brdr-a">
                        <td
                            colSpan={6}
                            className="border border-black p-1 text-center brdr-a text-9"
                        >
                            <i>
                                To be filled up in the Supply and Property Unit
                            </i>
                        </td>
                        <td
                            colSpan={2}
                            className="border border-black p-1 text-center brdr-a text-9"
                        >
                            <i>To be filled up in the Accounting Unit</i>
                        </td>
                    </tr>
                    <tr className="bg-gray-100 text-center font-semibold brdr-a text-11">
                        <th className="border border-black w-24 brdr-a width-10">
                            RIS No.
                        </th>
                        <th className="border border-black w-12 brdr-a width-10">
                            Responsibi-
                            <br />
                            lity <br /> Center Code
                        </th>
                        <th className="border border-black w-20 brdr-a width-10">
                            Stock No.
                        </th>
                        <th className="border border-black w-96 brdr-a width-40">
                            Item
                        </th>
                        <th className="border border-black w-16 brdr-a width-10">
                            UOM
                        </th>
                        <th className="border border-black w-16 brdr-a width-10">
                            QTY Issued
                        </th>
                        <th className="border border-black w-16 brdr-a width-10">
                            Unit Cost
                        </th>
                        <th className="border border-black w-16 brdr-a width-10">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <td
                                key={index}
                                className="border-r border-black brdr-r brdr-l py-4"
                            >
                                {""}&nbsp;
                            </td>
                        ))}
                    </tr>
                    {rsmi.map((item, idx) => {
                        const parsedDetails = item.details
                            .split("~")
                            .map((detailStr) => {
                                const [
                                    stock_no,
                                    itemName,
                                    unit,
                                    qty,
                                    avgUnitCost,
                                    totalCost,
                                ] = detailStr.split(";");
                                return {
                                    stock_no,
                                    itemName,
                                    unit: unit || "pcs",
                                    qty,
                                    avgUnitCost,
                                    totalCost,
                                };
                            });

                        return parsedDetails.map((detail, detailIdx) => (
                            <tr
                                key={`${item.risno}-${detailIdx}`}
                                className="text-center align-top items-list"
                            >
                                <td className="border-r border-black brdr-l brdr-r py-1 px-2 text-10">
                                    {detailIdx === 0
                                        ? `${year}-${month}-${item.risno}`
                                        : ""}
                                </td>
                                <td className="border-r border-black brdr-r py-1 px-2 text-10">
                                    {detailIdx === 0
                                        ? item.supervisor || "-"
                                        : ""}
                                </td>
                                <td className="border-r border-black brdr-r text-left py-1 px-2 text-10">
                                    {detail.stock_no}
                                </td>
                                <td className="border-r border-black brdr-r text-left py-1 px-2 text-l text-10">
                                    {detail.itemName}
                                </td>
                                <td className="border-r border-black brdr-r py-1 px-2 text-10 pdd-2">
                                    {detail.unit}
                                </td>
                                <td className="border-r border-black brdr-r py-1 px-2 text-10 pdd-2 width-8">
                                    {detail.qty}
                                </td>
                                <td className="border-r border-black brdr-r text-right py-1 px-1 text-10 width-8 text-r">
                                    {detail.avgUnitCost}
                                </td>
                                <td className="brdr-r text-right py-1 px-2 text-10 pdd-2 width-8 text-r">
                                    {detail.totalCost}
                                </td>
                            </tr>
                        ));
                    })}

                    <tr>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <td
                                key={index}
                                className="border-r border-black brdr-r brdr-l py-4"
                            >
                                {""}&nbsp;
                            </td>
                        ))}
                    </tr>

                    <tr className="brdr-a">
                        <td
                            colSpan={6}
                            className="border border-black p-1"
                        ></td>
                        <td className="border border-black p-1 font-semibold text-right text-r brdr-l brdr-r text-12">
                            <b>TOTAL</b>
                        </td>
                        <td className="border border-black font-semibold p-1 text-right text-r text-12">
                            <b>{totalAmount.toFixed(2)}</b>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RSMIDetails;
