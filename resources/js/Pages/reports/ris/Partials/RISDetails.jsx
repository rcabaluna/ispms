import React from "react";

const RISDetails = ({ risData }) => {
    const exampleData = [
        {
            stockNo: "01",
            unit: "pc",
            itemName: "Ballpen",
            quantity: 5,
            available: true,
            issueQty: 5,
        },
        {
            stockNo: "02",
            unit: "ream",
            itemName: "Bond Paper",
            quantity: 10,
            available: false,
            issueQty: 0,
        },
        {
            stockNo: "03",
            unit: "box",
            itemName: "Staple Wire",
            quantity: 2,
            available: true,
            issueQty: 2,
        },
    ];

    const items = risData?.length ? risData : exampleData;

    return (
        <div className="p-4 max-w-7xl mx-auto text-base">
            <table className="table-auto w-full border border-black border-collapse text-sm">
                <tbody>
                    <tr>
                        <td
                            className="text-center text-xl font-bold p-2"
                            colSpan={9}
                        >
                            REQUISITION AND ISSUE SLIP
                        </td>
                    </tr>
                    <tr>
                        <td className="p-2 font-semibold" colSpan={4}>
                            Entity Name: Department of Science and Technology -
                            Regional Office 10
                        </td>
                        <td className="p-2" colSpan={5}>
                            Fund Cluster: General Fund
                        </td>
                    </tr>
                    <tr className="border-t border-b border-black">
                        <td className="p-2 font-semibold" colSpan={1}>
                            Division:
                        </td>
                        <td className="p-2" colSpan={3}>
                            Admin Division
                        </td>
                        <td className="p-2 font-semibold" colSpan={3}>
                            Responsibility Center Code:
                        </td>
                        <td className="p-2" colSpan={2}>
                            JPTB
                        </td>
                    </tr>
                    <tr className="border-t border-b border-black">
                        <td className="p-2 font-semibold" colSpan={1}>
                            Office:
                        </td>
                        <td className="p-2" colSpan={3}>
                            FASD
                        </td>
                        <td className="p-2 font-semibold" colSpan={1}>
                            RIS No.:
                        </td>
                        <td className="p-2" colSpan={4}>
                            2025-03-001
                        </td>
                    </tr>

                    <tr>
                        <td
                            className="border border-black p-2 text-center font-semibold"
                            colSpan={5}
                        >
                            Requisition
                        </td>
                        <td
                            className="border border-black p-2 font-semibold"
                            colSpan={2}
                        >
                            Stock Available?
                        </td>
                        <td
                            className="border border-black p-2 font-semibold"
                            colSpan={2}
                        >
                            Issue
                        </td>
                    </tr>
                    <tr className="bg-gray-100 text-center font-semibold">
                        <th className="border border-black text-base w-20">
                            Stock No.
                        </th>
                        <th className="border border-black text-base w-4">
                            UOM
                        </th>
                        <th
                            className="border border-black text-base w-96"
                            colSpan={2}
                        >
                            Description
                        </th>
                        <th className="border border-black text-base">
                            Quantity
                        </th>
                        <th className="border border-black text-base w-10">
                            Yes
                        </th>
                        <th className="border border-black text-base w-10">
                            No
                        </th>
                        <th className="border border-black text-base">
                            Quantity
                        </th>
                        <th className="border border-black text-base">
                            Remarks
                        </th>
                    </tr>
                    {items.map((item, idx) => (
                        <tr key={idx} className="text-center align-top">
                            <td className="border border-black p-1">
                                {item.stockNo || ""}
                            </td>
                            <td className="border border-black p-1">
                                {item.unit || ""}
                            </td>
                            <td
                                className="border border-black p-1 text-left"
                                colSpan={2}
                            >
                                {item.itemName}
                            </td>
                            <td className="border border-black p-1">
                                {item.quantity}
                            </td>
                            <td className="border border-black p-1">
                                {item.available ? "x" : ""}
                            </td>
                            <td className="border border-black p-1">
                                {!item.available ? "x" : ""}
                            </td>
                            <td className="border border-black p-1">
                                {item.issueQty}
                            </td>
                            <td className="border border-black p-1"></td>
                        </tr>
                    ))}
                    <tr>
                        <td
                            className="border border-black p-2 font-semibold"
                            colSpan={1}
                        >
                            Purpose:
                        </td>
                        <td className="border border-black p-2" colSpan={8}>
                            Supplies and Materials
                        </td>
                    </tr>
                    <tr>
                        <td
                            colSpan={9}
                            className="border border-black p-2"
                        ></td>
                    </tr>
                    <tr className="text-center font-semibold">
                        <td
                            colSpan={2}
                            className="border border-black p-2"
                        ></td>
                        <td className="border border-black p-2">
                            Requested by:
                        </td>
                        <td className="border border-black p-2" colSpan={3}>
                            Approved/Issued by:
                        </td>
                        <td className="border border-black p-2" colSpan={3}>
                            Received by:
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black p-2" colSpan={2}>
                            Signature:
                        </td>
                        <td className="border border-black p-2"></td>
                        <td
                            className="border border-black p-2"
                            colSpan={3}
                        ></td>
                        <td
                            className="border border-black p-2"
                            colSpan={3}
                        ></td>
                    </tr>
                    <tr className="text-center">
                        <td
                            colSpan={2}
                            className="border border-black px-2 text-left"
                        >
                            Printed Name:
                        </td>
                        <td className="border border-black px-2 text-semibold">
                            JOHN PAUL T. BALISTOY
                        </td>
                        <td
                            className="border border-black px-2 text-semibold"
                            colSpan={3}
                        >
                            PAUL M. MAGLANGIT
                        </td>
                        <td
                            className="border border-black px-2 text-semibold"
                            colSpan={3}
                        >
                            JOHN PAUL T. BALISTOY
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td
                            colSpan={2}
                            className="border border-black p-2 text-left"
                        >
                            Designation:
                        </td>
                        <td className="border border-black p-2">
                            Accountant III
                        </td>
                        <td className="border border-black p-2" colSpan={3}>
                            Admin Aide I / Supply Unit
                        </td>
                        <td className="border border-black p-2" colSpan={3}>
                            Accountant III
                        </td>
                    </tr>
                    <tr className="text-center">
                        <td
                            colSpan={2}
                            className="border border-black p-2 text-left"
                        >
                            Date:
                        </td>
                        <td className="border border-black p-2"></td>
                        <td
                            className="border border-black p-2"
                            colSpan={3}
                        ></td>
                        <td
                            className="border border-black p-2"
                            colSpan={3}
                        ></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RISDetails;
