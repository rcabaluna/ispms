<p>Dear Requester,</p>

<p>We are pleased to inform you that your requested item(s) are now <strong>ready for pickup</strong> at the Supply Office.</p>

<p>Please find the request summary details below:</p>

<ul>
    <li><strong>Request Date:</strong> {{ \Carbon\Carbon::parse($data['requestSummary']->requestdate)->format('F j, Y') }}</li>
    <li><strong>Purpose:</strong> {{ $data['requestSummary']->purpose }}</li>
    <li><strong>Status:</strong> {{ $data['requestSummary']->xstatus }}</li>
    <li><strong>Remarks <small>(from Supply Unit)</small>:</strong> {{ $data['requestSummary']->remarks }}</li>

</ul>

<p>Kindly proceed to the <strong>Supply Office</strong> to collect your items.</p>

<p>If you have any questions or require assistance, don’t hesitate to contact us.</p>

<p>Thank you,<br>DOST 10 - Supply Unit</p>
