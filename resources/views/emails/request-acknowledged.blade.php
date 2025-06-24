<p>Dear Requester,</p>

<p>We would like to inform you that your supplies request has been <strong>acknowledged</strong>.</p>

<p>Please find the request summary details below:</p>

<ul>
    <li><strong>Request Date:</strong> {{ \Carbon\Carbon::parse($data['requestSummary']->requestdate)->format('F j, Y') }}</li>
    <li><strong>Purpose:</strong> {{ $data['requestSummary']->purpose }}</li>
    <li><strong>Status:</strong> {{ $data['requestSummary']->xstatus }}</li>
</ul>

<p>We will notify you once the item(s) are ready from the <strong>Supply Office</strong>.</p>

<p>If you have any questions or need further assistance, feel free to contact us.</p>

<p>Thank you,<br><b>DOST 10 - Supply Unit</b></p>
