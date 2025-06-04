<?php

namespace App\Http\Controllers;

use App\Models\RequestDetailsModel;
use App\Models\RequestSummaryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewRequestNotification;


class RequestController extends Controller
{
    public function index()
    {
        $employees = DB::connection('mysql2')->table('tblemppersonal')->get()->toArray();

        
        $items = DB::table('tblinventory_items AS a')
        ->select(
            'a.invitemsid', 
            'a.stock_no',
            'a.item',
            DB::raw('SUM(a.quantity) AS inventory_quantity'),
            DB::raw('(SELECT COALESCE(SUM(b.quantity), 0) FROM tblrequest_details b WHERE b.is_served = 1 AND b.stock_no = a.stock_no) AS served_quantity'),
            DB::raw('(SUM(a.quantity) - (SELECT COALESCE(SUM(b.quantity), 0) FROM tblrequest_details b WHERE b.is_served = 1 AND b.stock_no = a.stock_no)) AS quantity')
        )
        ->groupBy('a.stock_no', 'a.item')
        ->get();

        return inertia('request/page',['employees' => $employees, 'items' => $items]);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        // Create the request summary
        $requestSummary = RequestSummaryModel::create($data['summary']);

        // Create each request detail
        foreach ($data['details'] as $details) {
            $details['requestsummaryid'] = $requestSummary->requestsummaryid;
            $details['quantity'] = $details['requestedQuantity'] ?? 0;
            RequestDetailsModel::create($details);
        }

        // Send email to supply office
        $recipientEmail = 'rocabalunajr@region10.dost.gov.ph';
        Mail::to($recipientEmail)->send(new NewRequestNotification($requestSummary));


        return back()->with('message', 'Your order has been sent!');
    }


    public function requestSent(){
        return inertia('request/RequestSent');
    }
}
