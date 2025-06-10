<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RISController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index()
    {
        // Raw SQL with join and where clause
        $employees = DB::connection('mysql2')->select("
        SELECT a.empNumber, a.surname, a.firstname, a.nameExtension, a.middlename, c.positionDesc, c.positionAbb
        FROM tblemppersonal a JOIN tblempposition b ON b.empNumber = a.empNumber
        JOIN tblposition c ON c.positionCode = b.positionCode
        WHERE b.appointmentCode = 'P'
        ");

        // Pass to Inertia view
        return inertia('reports/ris/page', [
            'employees' => $employees,
        ]);
    }
    public function show(Request $request, string $empNumber)
    {   
        $param = $request->all();

        $results = DB::table('tblrequest_details as a')
        ->select([
            DB::raw('COALESCE(SUM(a.quantity), 0) AS quantity'),
            'a.stock_no',
            'c.item',
            'a.is_served',
        ])
        ->join('tblrequest_summary as b', 'b.requestsummaryid', '=', 'a.requestsummaryid')
        ->join('tblinventory_items as c', 'c.stock_no', '=', 'a.stock_no')
        ->where('b.supervisor', $empNumber)
        ->where('b.xstatus', "Served")
        ->whereMonth('b.requestDate', $param['month'])
        ->whereYear('b.requestDate', $param['year'])
        ->groupBy('a.stock_no', 'c.item', 'a.is_served')
        ->get();

        return response()->json($results);

    }

}
