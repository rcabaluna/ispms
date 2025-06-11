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

        return () => controller.abort();
    }, [selectedEmployee, month, year]);

    const filteredEmployees = employees.filter((employee) => {
        const fullName = [
            employee.surname || "",
            ", ",
            employee.firstname || "",
            employee.nameExtension ? ` ${employee.nameExtension}` : "",
            employee.middlename ? ` ${employee.middlename.charAt(0)}.` : "",
        ]
            .join("")
            .toLowerCase();
        return fullName.includes(search.toLowerCase());
    });

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
                            {[
                                employee.surname || "",
                                ", ",
                                employee.firstname || "",
                                employee.nameExtension
                                    ? ` ${employee.nameExtension}`
                                    : "",
                                employee.middlename
                                    ? ` ${employee.middlename.charAt(0)}.`
                                    : "",
                            ].join("")}
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
