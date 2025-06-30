<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RSMIController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->query('month', now()->format('m'));
        $year = $request->query('year', now()->format('Y'));

        $rsmi = DB::select("
            SELECT 
                ern.risno, 
                rs.supervisor,
                GROUP_CONCAT(CONCAT(
                    agg.stock_no, ';', 
                    inv_i.item, ';', 
                    uom.name, ';',
                    agg.total_quantity, ';', 
                    ROUND(inv_avg.avg_unit_cost, 2), ';',
                    ROUND(inv_avg.avg_unit_cost * agg.total_quantity, 2)
                ) SEPARATOR '~') AS details
            FROM tblrequest_summary rs
            JOIN (
                SELECT requestsummaryid, stock_no, SUM(quantity) AS total_quantity
                FROM tblrequest_details
                WHERE is_served = 1
                GROUP BY requestsummaryid, stock_no
            ) agg ON agg.requestsummaryid = rs.requestsummaryid
            JOIN tblinventory_items inv_i ON inv_i.stock_no = agg.stock_no
            JOIN tbluom uom ON uom.uomid = inv_i.uomid
            JOIN (
                SELECT stock_no, AVG(unit_cost) AS avg_unit_cost
                FROM tblinventory_items
                GROUP BY stock_no
            ) inv_avg ON inv_avg.stock_no = agg.stock_no
            JOIN tblstockin st 
                ON st.POnumber = inv_i.POnumber 
            AND st.created_at < DATE_ADD(LAST_DAY(DATE_FORMAT(rs.requestDate, '%Y-%m-01')), INTERVAL 1 DAY)
            LEFT JOIN tblemprisno ern ON ern.empnumber = rs.supervisor
            WHERE rs.xstatus = 'Served'
            AND MONTH(rs.requestDate) = ?
            AND YEAR(rs.requestDate) = ?
            GROUP BY rs.supervisor, ern.risno
        ", [$month, $year]);

        return inertia('reports/rsmi/page', [
            'rsmi' => $rsmi,
        ]);
    }

    public function show(Request $request)
    {
        $month = $request->query('month', now()->format('m'));
        $year = $request->query('year', now()->format('Y'));

        $rsmi = DB::select("
            SELECT 
                ern.risno, 
                rs.supervisor,
                GROUP_CONCAT(CONCAT(
                    agg.stock_no, ';', 
                    inv_i.item, ';', 
                    uom.name, ';',
                    agg.total_quantity, ';', 
                    ROUND(inv_avg.avg_unit_cost, 2), ';',
                    ROUND(inv_avg.avg_unit_cost * agg.total_quantity, 2)
                ) SEPARATOR '~') AS details
            FROM tblrequest_summary rs
            JOIN (
                SELECT requestsummaryid, stock_no, SUM(quantity) AS total_quantity
                FROM tblrequest_details
                WHERE is_served = 1
                GROUP BY requestsummaryid, stock_no
            ) agg ON agg.requestsummaryid = rs.requestsummaryid
            JOIN tblinventory_items inv_i ON inv_i.stock_no = agg.stock_no
            JOIN tbluom uom ON uom.uomid = inv_i.uomid
            JOIN (
                SELECT stock_no, AVG(unit_cost) AS avg_unit_cost
                FROM tblinventory_items
                GROUP BY stock_no
            ) inv_avg ON inv_avg.stock_no = agg.stock_no
            JOIN tblstockin st 
                ON st.POnumber = inv_i.POnumber 
            AND st.created_at < DATE_ADD(LAST_DAY(DATE_FORMAT(rs.requestDate, '%Y-%m-01')), INTERVAL 1 DAY)
            LEFT JOIN tblemprisno ern ON ern.empnumber = rs.supervisor
            WHERE rs.xstatus = 'Served'
            AND MONTH(rs.requestDate) = ?
            AND YEAR(rs.requestDate) = ?
            GROUP BY rs.supervisor, ern.risno
        ", [$month, $year]);

        return response()->json($rsmi);
    }

}
