<?php

namespace App\Http\Controllers;

use App\Models\Libraries\RISNoModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RISController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Step 1: Get employees from the other database
        $employees = DB::connection('mysql2')->select("
            SELECT 
                a.empNumber, 
                a.surname, 
                a.firstname, 
                a.nameExtension, 
                a.middlename, 
                c.positionDesc, 
                c.positionAbb, 
                CASE 
                    WHEN b.serviceCode LIKE 'PSTO-%' THEN g.group2Name 
                    ELSE 'Regional Office' 
                END AS office,
                CASE
                    WHEN b.serviceCode LIKE 'PSTO-%' THEN 'Provincial Office'
                    ELSE g.group2Name
                END AS division
            FROM 
                tblemppersonal a
            JOIN 
                tblempposition b ON b.empNumber = a.empNumber
            JOIN 
                tblposition c ON c.positionCode = b.positionCode
            LEFT JOIN 
                tblgroup2 g ON g.group2Code = b.serviceCode
            WHERE 
                b.appointmentCode = 'P' AND b.statusOfAppointment = 'In-Service'
            ORDER BY 
                a.surname ASC
        ");

        $emprisno = RISNoModel::pluck('risno', 'empnumber')->toArray();

        $employeesWithRisno = array_map(function ($employee) use ($emprisno) {
            $employee->risno = $emprisno[$employee->empNumber] ?? null;
            return $employee;
        }, $employees);

        return inertia('reports/ris/page', [
            'employees' => $employeesWithRisno,
        ]);
    }

    public function show(Request $request, string $empNumber)
    {   

        $param = $request->all();


        $results = DB::table('tblrequest_details as a')
        ->selectRaw('
            COALESCE(SUM(a.quantity), 0) AS quantity,
            a.requestdetailsid,
            a.requestsummaryid,
            a.stock_no,
            (SELECT item FROM tblinventory_items c WHERE c.stock_no = a.stock_no LIMIT 1) AS item,
            a.is_served
        ')
        ->join('tblrequest_summary as b', 'b.requestsummaryid', '=', 'a.requestsummaryid')
        ->where('b.supervisor', '=', $empNumber)
        ->where('b.xstatus', '=', 'Served')
        ->whereMonth('b.requestDate', '=', $param['month'])
        ->whereYear('b.requestDate', '=', $param['year'])
        ->groupBy('a.stock_no')
        ->get();
        return response()->json($results);

    }

}
