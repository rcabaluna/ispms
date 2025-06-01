<?php

namespace App\Http\Controllers;

use App\Models\RequestSummaryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryRequestsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all employees from mysql2 and key them by empNumber
        $employees = collect(DB::connection('mysql2')->select("
            SELECT 
                a.empNumber, 
                a.surname, 
                a.firstname, 
                a.nameExtension, 
                a.middlename, 
                c.positionDesc
            FROM tblemppersonal a 
            JOIN tblempposition b ON b.empNumber = a.empNumber
            JOIN tblposition c ON c.positionCode = b.positionCode
        "))->keyBy('empNumber');

        // Load all request summaries
        $requests = RequestSummaryModel::get()->toArray();

        // Merge requests with both requester and supervisor info
        $mergedRequests = array_map(function ($request) use ($employees) {
            $requesterEmpNo = $request['requester'];
            $supervisorEmpNo = $request['supervisor'];

            // Add requester details
            $request['requester_details'] = $employees->has($requesterEmpNo)
                ? (array) $employees->get($requesterEmpNo)
                : null;

            // Add supervisor details
            $request['supervisor_details'] = $employees->has($supervisorEmpNo)
                ? (array) $employees->get($supervisorEmpNo)
                : null;

            return $request;
        }, $requests);


        return inertia('requests/page', [
            'requests' => $mergedRequests,
        ]);
    }


    public function show(string $requestsummaryid)
    {

        $data = DB::table('tblrequest_details as a')
            ->join('tblinventory_items as b', 'b.stock_no', '=', 'a.stock_no')
            ->leftJoin('tblrequest_summary as s', 's.requestsummaryid', '=', 'a.requestsummaryid')
            ->leftJoin('tblris as c', function($join) {
                $join->on('c.empNumber', '=', 's.supervisor')
                    ->on('c.stock_no', '=', 'b.stock_no');
            })
            ->where('a.requestsummaryid', $requestsummaryid)
            ->select(
                'a.*',
                'b.item',
                DB::raw('COALESCE(c.quantity, 0) as issued_quantity')
            )
            ->groupBy(
                'b.stock_no',
                'a.requestdetailsid',
                'a.requestsummaryid',
                'a.stock_no',
                'b.item',
                'c.empNumber'
            )
            ->get();

            return response()->json([
                'items' => $data
            ]);
    }

}
