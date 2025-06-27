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
                        <TableCell
                            style={{
                                position: "relative",
                                paddingRight: "20px",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "#f3f4f6")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "transparent")
                            }
                        >
                            <div>
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
                            </div>

                            {employee.has_served && (
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "6px",
                                        right: "6px",
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(0, 128, 0, 0.5)", // lighter green
                                        boxShadow:
                                            "0 0 5px rgba(0, 128, 0, 0.5)",
                                    }}
                                    title="Has served"
                                />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default EmployeesTable;
