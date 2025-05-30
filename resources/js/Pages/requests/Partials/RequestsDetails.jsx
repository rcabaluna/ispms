import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

const RequestsDetails = ({ selectedRequest }) => {
    const [requestDetails, setRequestDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedRequest) {
            setRequestDetails(null);
            return;
        }

        setLoading(true);

        // Use Inertia router to fetch data from the backend
        router.get(route("requests.show", selectedRequest.requestsummaryid), {
            preserveState: true,
            onSuccess: (page) => {
                setRequestDetails(page.props.requestDetails);
                setLoading(false);
            },
            onError: () => {
                setRequestDetails(null);
                setLoading(false);
            },
        });
    }, [selectedRequest]);

    if (!selectedRequest) {
        return <div className="text-gray-500">No request selected</div>;
    }

    if (loading) {
        return <div className="text-gray-500">Loading request details...</div>;
    }

    if (!requestDetails) {
        return (
            <div className="text-red-500">Failed to load request details.</div>
        );
    }

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-bold">Request Details</h2>
            <p>
                <strong>Purpose:</strong> {requestDetails.purpose}
            </p>
            <p>
                <strong>Requester:</strong>{" "}
                {requestDetails.requester_details.firstname}{" "}
                {requestDetails.requester_details.surname}{" "}
                {requestDetails.requester_details.nameExtension}
            </p>
            <p>
                <strong>Date:</strong>{" "}
                {new Date(requestDetails.requestdate).toLocaleDateString(
                    "en-US",
                    {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                    }
                )}
            </p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default RequestsDetails;
