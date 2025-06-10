import React, { useEffect, useState } from "react";

const RISDetails = ({ risData, selectedEmployee }) => {
    const [RISData, setRISData] = useState([]);

    // Example fallback data
    const exampleData = [
        {
            stockNo: null,
            unit: null,
            itemName: null,
            quantity: null,
            available: null,
            issueQty: null,
        },
    ];

    // Fetch data from API
    const getData = async () => {
        try {
            const response = await fetch(
                "/reports/ris/show/" +
                    selectedEmployee.empNumber +
                    "?month=06&year=2025"
            );

            console.log(
                "/reports/ris/show/" +
                    selectedEmployee.empNumber +
                    "?month=06&year=2025"
            );
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();

            setRISData(data);
        } catch (error) {
            console.error("Error fetching RIS data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [selectedEmployee]);

    if (!selectedEmployee)
        return (
            <div className="p-4 text-center text-red-600">
                No employee selected.
            </div>
        );

    if (!RISData || RISData.length === 0)
        return (
            <div className="p-4 text-center text-red-600">
                No RIS data available for the selected employee.
            </div>
        );

    return (
        <div className="p-4 max-w-7xl mx-auto text-base">
            <div className="text-right text-r text-sm text-12">
                <i>Appendix 63</i>
            </div>
            <table className="table-auto w-full border border-black border-collapse text-sm text-13">
                <tbody>
                    <tr>
                        <td
                            className="text-center text-xl font-bold p-1 brdr-t brdr-l brdr-r text-16"
                            colSpan={10}
                        >
                            <b>REQUISITION AND ISSUE SLIP</b>
                        </td>
                    </tr>
                    <tr className="brdr-l brdr-r">
                        <td colSpan={10} className="p-1">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td
                            className="text-l p-1 font-semibold brdr-l"
                            colSpan={5}
                        >
                            <b>
                                Entity Name: Department of Science and
                                Technology
                            </b>
                        </td>
                        <td className="p-1" colSpan={3}>
                            <b>Fund Cluster:</b>
                        </td>
                        <td colSpan={2} className="text-l p-1 brdr-r">
                            <u>General Fund</u>
                        </td>
                    </tr>
                    <tr className="border-t border-black brdr-l brdr-r">
                        <td className="p-1 font-semibold" colSpan={1}></td>
                        <td
                            className="p-1 font-semibold text-left text-l"
                            colSpan={9}
                        >
                            &nbsp;&nbsp;&nbsp;&nbsp; <b>Regional Office 10</b>
                        </td>
                    </tr>
                    <tr className="border-t border-black brdr-t brdr-l brdr-r">
                        <td className="p-1 font-semibold text-l" colSpan={1}>
                            Division:
                        </td>
                        <td
                            className="p-1 border-r border-black brdr-r text-l"
                            colSpan={4}
                        >
                            Admin Division
                        </td>
                        <td
                            className="p-1 font-semibold text-12 text-l text-13"
                            colSpan={3}
                        >
                            Responsibility Center Code:
                        </td>
                        <td className="p-1 brdr-r" colSpan={2}>
                            {selectedEmployee.empNumber}
                        </td>
                    </tr>
                    <tr className="border-t border-b border-black">
                        <td
                            className="p-1 font-semibold text-l brdr-l"
                            colSpan={1}
                        >
                            Office:
                        </td>
                        <td
                            className="p-1  border-r border-black brdr-r text-l"
                            colSpan={4}
                        >
                            FASD
                        </td>
                        <td className="p-1 font-semibold text-l" colSpan={1}>
                            RIS No.:
                        </td>
                        <td className="p-1 brdr-r text-l" colSpan={4}>
                            2025-03-001
                        </td>
                    </tr>

                    <tr className="brdr-a">
                        <td
                            className="border border-black p-1 text-center font-semibold brdr-a text-12"
                            colSpan={6}
                        >
                            <b>
                                <i>Requisition</i>
                            </b>
                        </td>
                        <td
                            className="border border-black p-1 font-semibold brdr-a text-12"
                            colSpan={2}
                        >
                            <b>
                                <i>Stock Available?</i>
                            </b>
                        </td>
                        <td
                            className="border border-black p-1 font-semibold brdr-a text-12 text-center"
                            colSpan={2}
                        >
                            <b>
                                <i>Issue</i>
                            </b>
                        </td>
                    </tr>
                    <tr className="bg-gray-100 text-center font-semibold brdr-a">
                        <th className="border border-black text-base w-20 brdr-a width-10">
                            Stock No.
                        </th>
                        <th className="border border-black text-base w-4 brdr-a text-13 width-7">
                            UOM
                        </th>
                        <th
                            className="border border-black text-base w-96 brdr-a text-13 w-50"
                            colSpan={3}
                        >
                            Description
                        </th>
                        <th className="border border-black text-base w-10 brdr-a text-13 width-8">
                            Quantity
                        </th>
                        <th className="border border-black text-base w-16 brdr-a text-13  width-8">
                            Yes
                        </th>
                        <th className="border border-black text-base w-16  brdr-a text-13  width-8">
                            No
                        </th>
                        <th className="border border-black text-base w-12 brdr-a text-13  width-8">
                            Quantity
                        </th>
                        <th className="border border-black text-base w-12 brdr-a text-13  width-8">
                            Remarks
                        </th>
                    </tr>
                    {RISData.map((item, idx) => (
                        <tr
                            key={idx}
                            className="text-center align-top items-list"
                        >
                            <td className="text-13 border border-black p-1 text-l brdr-l brdr-r">
                                {item.stock_no || ""}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-r">
                                {item.unit || ""}
                            </td>
                            <td
                                className=" text-13 border border-black p-1 text-left text-l brdr-r"
                                colSpan={3}
                            >
                                {item.item}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-r">
                                {item.quantity}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-r">
                                {item.is_served ? "x" : ""}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-r">
                                {!item.is_served ? "x" : ""}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-r">
                                {item.issueQty}
                            </td>
                            <td className=" text-13 border border-black p-1 brdr-r"></td>
                        </tr>
                    ))}
                    <tr className="brdr-a">
                        <td
                            className="border border-black p-1 font-semibold brdr-a text-r"
                            colSpan={1}
                        >
                            <i>Purpose:</i>
                        </td>
                        <td
                            className="border border-black p-1 text-l"
                            colSpan={9}
                        >
                            <i>Supplies and Materials</i>
                        </td>
                    </tr>
                    <tr className="brdr-a">
                        <td colSpan={10} className="border border-black p-1">
                            &nbsp;
                        </td>
                    </tr>
                    <tr className="text-center font-semibold brdr-a">
                        <td
                            colSpan={2}
                            className="border border-black p-1 brdr-a"
                        ></td>
                        <td
                            className="border border-black p-1 brdr-a text-l text-left"
                            colSpan={2}
                        >
                            <b>Requested by:</b>
                        </td>
                        <td
                            className="border border-black p-1 brdr-a width-25 text-left text-l"
                            colSpan={3}
                        >
                            <b>Approved/Issued by:</b>
                        </td>
                        <td
                            className="border border-black p-1 brdr-a width-25 text-left text-l"
                            colSpan={3}
                        >
                            <b>Received by:</b>
                        </td>
                    </tr>
                    <tr className="brdr-l brdr-r text-13">
                        <td
                            className="border border-black p-1 brdr-r text-left text-l"
                            colSpan={2}
                        >
                            Signature:
                        </td>
                        <td
                            className="border border-black p-1 brdr-r"
                            colSpan={2}
                        ></td>
                        <td
                            className="border border-black p-1 brdr-r"
                            colSpan={3}
                        ></td>
                        <td
                            className="border border-black p-1 brdr-r"
                            colSpan={3}
                        ></td>
                    </tr>
                    <tr className="text-center brdr-r brdr-l brdr-b">
                        <td
                            colSpan={2}
                            className="border border-black px-2 text-left brdr-r text-left text-l"
                        >
                            Printed Name:
                        </td>
                        <td
                            className="border border-black px-2 text-semibold brdr-r text-13"
                            colSpan={2}
                        >
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
                            className="border border-black p-1 text-left brdr-a text-left text-l"
                        >
                            Designation:
                        </td>
                        <td
                            className="border border-black p-1 brdr-a"
                            colSpan={2}
                        >
                            Accountant III
                        </td>
                        <td
                            className="border border-black p-1 brdr-a"
                            colSpan={3}
                        >
                            Admin Aide I / Supply Unit
                        </td>
                        <td
                            className="border border-black p-1 brdr-a"
                            colSpan={3}
                        >
                            Accountant III
                        </td>
                    </tr>
                    <tr className="text-center brdr-a">
                        <td
                            colSpan={2}
                            className="border border-black p-1 text-left brdr-a text-left text-l"
                        >
                            Date:
                        </td>
                        <td
                            className="border border-black p-1 brdr-a"
                            colSpan={2}
                        ></td>
                        <td
                            className="border border-black p-1 brdr-a"
                            colSpan={3}
                        ></td>
                        <td
                            className="border border-black p-1 brdr-a"
                            colSpan={3}
                        ></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RISDetails;
