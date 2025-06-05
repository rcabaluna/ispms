import React, { useEffect } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

const EmployeesTable = ({
    employees,
    search,
    month,
    year,
    onRISFetched,
    selectedEmployee,
    setSelectedEmployee,
}) => {
    useEffect(() => {
        if (!selectedEmployee) return;

        const controller = new AbortController();
        const { empNumber } = selectedEmployee;

        const fetchEmployeeRIS = async () => {
            try {
                const response = await fetch(
                    `/inventory/ris/data/${empNumber}?month=${month}&year=${year}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(
                        `Error ${response.status}: ${response.statusText}`
                    );
                }

                const data = await response.json();
                onRISFetched(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Fetch error:", err);
                    onRISFetched([]);
                }
            }
        };

        fetchEmployeeRIS();

        return () => controller.abort();
    }, [selectedEmployee, month, year]);

    const filteredEmployees = employees.filter((employee) =>
        `${employee.firstname} ${employee.surname} ${
            employee.nameExtension || ""
        } ${employee.positionDesc || ""}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Employee</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredEmployees.map((employee) => (
                    <TableRow
                        key={employee.empNumber}
                        onClick={() => setSelectedEmployee(employee)}
                        style={{
                            cursor: "pointer",
                            backgroundColor:
                                selectedEmployee?.empNumber ===
                                employee.empNumber
                                    ? "#e0e0e0"
                                    : "transparent",
                        }}
                    >
                        <TableCell>
                            {employee.firstname} {employee.surname}{" "}
                            {employee.nameExtension}
                            <br />
                            <small>{employee.positionDesc}</small>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default EmployeesTable;
