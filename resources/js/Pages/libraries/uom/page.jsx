import MainLayout from "@/Layouts/MainLayout";
import React, { useState } from "react";
import { DataTable } from "./partials/DataTable";
import { columns } from "./partials/TableColumns";
import { Toaster } from "@/Components/ui/toaster";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";
import { ShowToast } from "@/Layouts/ShowToast";

const UOM = ({ uoms }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        name: "",
        abbreviation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("uom.store"), {
            data,
            onSuccess: () => {
                // Close the dialog
                setDialogOpen(false);

                // Optionally reset the form
                setData({
                    name: "",
                    abbreviation: "",
                });

                ShowToast({
                    title: "Success!",
                    description: "UOM added successfully.",
                    className: "bg-green-500 text-white",
                });
            },
            onError: (errors) => {
                ShowToast({
                    title: "Error!",
                    description: errors,
                    className: "bg-red-500 text-white",
                });
            },
        });
    };

    return (
        <>
            <div className="flex flex-1 flex-col gap-4 pt-10 px-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">
                            Manage Unit of Measures
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage UOMs.
                        </p>
                    </div>
                    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button>Add UOM</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-full max-w-3xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Add Unit of Measure
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">
                                            Unit of Measure
                                        </h4>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="col-span-2 h-8"
                                            placeholder="Enter UOM"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">
                                            Shorthand
                                        </h4>
                                        <Input
                                            id="abbreviation"
                                            value={data.abbreviation}
                                            onChange={(e) =>
                                                setData(
                                                    "abbreviation",
                                                    e.target.value
                                                )
                                            }
                                            className="col-span-2 h-8"
                                            placeholder="Enter shorthand"
                                        />
                                    </div>
                                </div>

                                <AlertDialogFooter className="pt-4">
                                    <AlertDialogCancel type="button">
                                        Cancel
                                    </AlertDialogCancel>
                                    <Button type="submit">Submit</Button>
                                </AlertDialogFooter>
                            </form>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <div className="grid auto-rows-min gap-4 pt-5 md:grid-cols-1">
                    <div className="table-container">
                        <DataTable columns={columns} data={uoms} />
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

UOM.layout = (page) => <MainLayout>{page}</MainLayout>;

export default UOM;
