<?php

namespace App\Http\Controllers;

use App\Models\RequestDetailsModel;
use App\Models\RequestSummaryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RequestController extends Controller
{
    public function index()
    {
        $employees = DB::connection('mysql2')->table('tblemppersonal')->get()->toArray();
        $items = DB::table('tblinventory_items')
        ->where('quantity', '!=', 0)
        ->groupBy('stock_no')
        ->get();

        return inertia('request/page',['employees' => $employees, 'items' => $items]);
    }

    public function store(Request $request)
    {
        // sleep(5);
        
        $data = $request->all();


        $requestsummaryid = RequestSummaryModel::create($data['summary'])->id;

        foreach ($data['details'] as $details) {
            $details['requestsummaryid'] = $requestsummaryid;
            unset($details['quantity']);
            $details['quantity'] = $details['requestedQuantity'] ?? 0;

            RequestDetailsModel::create($details);
        }

        return back()->with('message', 'Your order has been sent!');
    }

    public function requestSent(){
        return inertia('request/RequestSent');
    }

}
