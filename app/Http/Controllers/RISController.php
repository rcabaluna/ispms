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
    public function index(Request $request)
    {
        $month = $request->query('month', now()->format('m'));
        $year = $request->query('year', now()->format('Y'));

        // Step 1: Get employees from other DB
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

        // Step 2: RIS numbers
        $emprisno = RISNoModel::pluck('risno', 'empnumber')->toArray();

        // Step 3: Get unique empNumbers from `supervisor` column
        $supervisorEmpNumbers = DB::table('tblrequest_summary')
            ->select('supervisor')
            ->distinct()
            ->where('xstatus', 'Served')
            ->whereMonth('requestDate', $month)
            ->whereYear('requestDate', $year)
            ->pluck('supervisor')
            ->toArray(); // assumes supervisor = empNumber

        // Step 4: Merge risno + supervisor check
        $employeesWithRisno = array_map(function ($employee) use ($emprisno, $supervisorEmpNumbers) {
            $employee->risno = $emprisno[$employee->empNumber] ?? null;
            $employee->has_served = in_array($employee->empNumber, $supervisorEmpNumbers);
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
