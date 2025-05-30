import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const OrdersCombobox = ({ employees, value, onSelect, placeholder }) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value || placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search employee..." />
                    <CommandEmpty>No employee found.</CommandEmpty>
                    <CommandGroup>
                        {employees.map((emp) => {
                            const fullName = [
                                emp.firstname,
                                emp.middleInitial
                                    ? emp.middleInitial + "."
                                    : "",
                                emp.surname,
                                emp.nameExtension,
                            ]
                                .filter(Boolean)
                                .join(" ");
                            return (
                                <CommandItem
                                    key={emp.empNumber}
                                    value={fullName}
                                    onSelect={() => {
                                        onSelect(
                                            fullName === value ? "" : fullName
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === fullName
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {fullName}
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default OrdersCombobox;
