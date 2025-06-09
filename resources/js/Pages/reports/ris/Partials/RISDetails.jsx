import React from "react";

const RISDetails = ({ risData }) => {
    const exampleData = [
        {
            stockNo: "130-02A",
            unit: "pc",
            itemName: "TISSUE, INTERFOLDED PAPER TOWEL, 150 pulls/pack",
            quantity: 5,
            available: true,
            issueQty: 5,
        },
        {
            stockNo: "190-12",
            unit: "ream",
            itemName: 'NOTE PAD, stick-on, (3"x3"), 100 sheets per pad',
            quantity: 10,
            available: false,
            issueQty: 0,
        },
        {
            stockNo: "190-01A",
            unit: "box",
            itemName: "PAPER, Multi-Purpose (COPY) A4, 70gsm",
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
                            className="text-center text-xl font-bold p-2 brdr-t brdr-l brdr-r"
                            colSpan={9}
                        >
                            REQUISITION AND ISSUE SLIP
                        </td>
                    </tr>
                    <tr className="brdr-l brdr-r">
                        <td colSpan={9} className="p-2">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="text-l p-2 font-semibold brdr-l"
                            colSpan={4}
                        >
                            <b>
                                Entity Name: Department of Science and
                                Technology - Regional Office 10
                            </b>
                        </td>
                        <td className="p-2 brdr-r" colSpan={5}>
                            <b>Fund Cluster:</b> General Fund
                        </td>
                    </tr>
                    <tr className="border-t border-black brdr-t brdr-l brdr-r">
                        <td className="p-2 font-semibold text-l" colSpan={1}>
                            Division:
                        </td>
                        <td
                            className="p-2 border-r border-black brdr-r text-l"
                            colSpan={3}
                        >
                            Admin Division
                        </td>
                        <td
                            className="p-2 font-semibold text-12 text-l text-13"
                            colSpan={3}
                        >
                            Responsibility Center Code:
                        </td>
                        <td className="p-2 brdr-r" colSpan={2}>
                            JPTB
                        </td>
                    </tr>
                    <tr className="border-t border-b border-black">
                        <td
                            className="p-2 font-semibold text-l brdr-l"
                            colSpan={1}
                        >
                            Office:
                        </td>
                        <td
                            className="p-2  border-r border-black brdr-r text-l"
                            colSpan={3}
                        >
                            FASD
                        </td>
                        <td className="p-2 font-semibold text-l" colSpan={1}>
                            RIS No.:
                        </td>
                        <td className="p-2 brdr-r text-l" colSpan={4}>
                            2025-03-001
                        </td>
                    </tr>

                    <tr className="brdr-a">
                        <td
                            className="border border-black p-2 text-center font-semibold brdr-a text-12"
                            colSpan={5}
                        >
                            <b>
                                <i>Requisition</i>
                            </b>
                        </td>
                        <td
                            className="border border-black p-2 font-semibold brdr-a text-12"
                            colSpan={2}
                        >
                            <b>
                                <i>Stock Available?</i>
                            </b>
                        </td>
                        <td
                            className="border border-black p-2 font-semibold brdr-a text-12"
                            colSpan={2}
                        >
                            <b>
                                <i>Issue</i>
                            </b>
                        </td>
                    </tr>
                    <tr className="bg-gray-100 text-center font-semibold brdr-a text-16">
                        <th className="border border-black text-base w-20 brdr-a text-13">
                            Stock No.
                        </th>
                        <th className="border border-black text-base w-4 brdr-a text-13">
                            UOM
                        </th>
                        <th
                            className="border border-black text-base w-96 brdr-a text-13"
                            colSpan={2}
                        >
                            Description
                        </th>
                        <th className="border border-black text-base w-10 brdr-a text-13">
                            Quantity
                        </th>
                        <th className="border border-black text-base w-16 brdr-a text-13">
                            Yes
                        </th>
                        <th className="border border-black text-base w-16  brdr-a text-13">
                            No
                        </th>
                        <th className="border border-black text-base w-12 brdr-a text-13">
                            Quantity
                        </th>
                        <th className="border border-black text-base w-12 brdr-a text-13">
                            Remarks
                        </th>
                    </tr>
                    {items.map((item, idx) => (
                        <tr key={idx} className="text-center align-top brdr-a">
                            <td className=" text-13 border border-black p-1 brdr-a text-l">
                                {item.stockNo || ""}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-a">
                                {item.unit || ""}
                            </td>
                            <td
                                className=" text-13 border border-black p-1 text-left brdr-a text-l"
                                colSpan={2}
                            >
                                {item.itemName}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-a">
                                {item.quantity}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-a">
                                {item.available ? "x" : ""}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-a">
                                {!item.available ? "x" : ""}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-a">
                                {item.issueQty}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-a"></td>
                        </tr>
                    ))}
                    <tr className="brdr-a">
                        <td
                            className="border border-black p-2 font-semibold brdr-a text-r"
                            colSpan={1}
                        >
                            <i>Purpose:</i>
                        </td>
                        <td
                            className="border border-black p-2 text-l"
                            colSpan={8}
                        >
                            Supplies and Materials
                        </td>
                    </tr>
                    <tr className="brdr-a">
                        <td colSpan={9} className="border border-black p-2">
                            &nbsp;
                        </td>
                    </tr>
                    <tr className="text-center font-semibold brdr-a">
                        <td
                            colSpan={2}
                            className="border border-black p-2 brdr-a"
                        ></td>
                        <td className="border border-black p-2 brdr-a">
                            Requested by:
                        </td>
                        <td
                            className="border border-black p-2 brdr-a"
                            colSpan={3}
                        >
                            Approved/Issued by:
                        </td>
                        <td
                            className="border border-black p-2 brdr-a"
                            colSpan={3}
                        >
                            Received by:
                        </td>
                    </tr>
                    <tr className="brdr-l brdr-r text-13">
                        <td
                            className="border border-black p-2 brdr-r"
                            colSpan={2}
                        >
                            Signature:
                        </td>
                        <td className="border border-black p-2 brdr-r"></td>
                        <td
                            className="border border-black p-2 brdr-r"
                            colSpan={3}
                        ></td>
                        <td
                            className="border border-black p-2 brdr-r"
                            colSpan={3}
                        ></td>
                    </tr>
                    <tr className="text-center brdr-r brdr-l brdr-b">
                        <td
                            colSpan={2}
                            className="border border-black px-2 text-left brdr-r"
                        >
                            Printed Name:
                        </td>
                        <td className="border border-black px-2 text-semibold brdr-r text-13">
                            <b>JOHN PAUL T. BALISTOY</b>
                        </td>
                        <td
                            className="border border-black px-2 text-semibold brdr-r text-13"
                            colSpan={3}
                        >
                            <b>PAUL M. MAGLANGIT</b>
                        </td>
                        <td
                            className="border border-black px-2 text-semibold text-13"
                            colSpan={3}
                        >
                            <b>JOHN PAUL T. BALISTOY</b>
                        </td>
                    </tr>
                    <tr className="text-center brdr-a">
                        <td
                            colSpan={2}
                            className="border border-black p-2 text-left brdr-a"
                        >
                            Designation:
                        </td>
                        <td className="border border-black p-2 brdr-a">
                            Accountant III
                        </td>
                        <td
                            className="border border-black p-2 brdr-a"
                            colSpan={3}
                        >
                            Admin Aide I / Supply Unit
                        </td>
                        <td
                            className="border border-black p-2 brdr-a"
                            colSpan={3}
                        >
                            Accountant III
                        </td>
                    </tr>
                    <tr className="text-center brdr-a">
                        <td
                            colSpan={2}
                            className="border border-black p-2 text-left brdr-a"
                        >
                            Date:
                        </td>
                        <td className="border border-black p-2 brdr-a"></td>
                        <td
                            className="border border-black p-2 brdr-a"
                            colSpan={3}
                        ></td>
                        <td
                            className="border border-black p-2 brdr-a"
                            colSpan={3}
                        ></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RISDetails;
