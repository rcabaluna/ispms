<p>Dear Supply Office,</p>

<p>This is an automated notification to inform you that a new supplies request has been submitted through the ISPMS.</p>

<p><strong>Request Summary:</strong></p>
<ul>
    <li><strong>Request Date:</strong> {{ \Carbon\Carbon::parse($requestSummary->requestdate)->format('F j, Y') }}</li>
    <li><strong>Purpose:</strong> {{ $requestSummary->purpose }}</li>
    <li><strong>Status:</strong> Pending</li>
    <li><strong>Requested By (Emp No):</strong> {{ $requestSummary->requester }}</li>
</ul>

<p>Please log in to the system to review and process this request.</p>

<br>
<small><i>This is a system-generated email. Please do not reply to this message.</i></small>
