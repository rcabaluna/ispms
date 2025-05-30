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
        SELECT a.empNumber, a.surname, a.firstname, a.nameExtension, a.middlename, c.positionDesc
        FROM tblemppersonal a JOIN tblempposition b ON b.empNumber = a.empNumber
        JOIN tblposition c ON c.positionCode = b.positionCode
        WHERE b.appointmentCode = 'P'
        ");

        // Pass to Inertia view
        return inertia('ris/page', [
            'employees' => $employees,
        ]);
    }


    public function employeee_ris(Request $request, string $empnumber){
        $params = $request->all();

        $items = DB::table('tblinventory_items as a')
            ->join('tblris as b', 'b.stock_no', '=', 'a.stock_no')
            ->where('b.empNumber', $empnumber)
            ->where('b.year', $params['year'])
            ->where('b.month', $params['month'])
            ->groupBy('a.stock_no')
            ->select('a.item', 'b.*')
            ->get();

        return response()->json($items);

    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $items = $request->input('items', []);

        foreach ($items as $item) {
            DB::table('tblris')->insert([
                'empNumber' => $item['empNumber'],
                'stock_no' => $item['stock_no'],
                'quantity' => $item['quantity'],
                'year' => $item['year'],
                'month' => $item['month'],
            ]);
        }

        return back()->with('message', 'Item/s issuance has been upload successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
