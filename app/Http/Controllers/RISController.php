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
        return inertia('reports/ris/page', [
            'employees' => $employees,
        ]);
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
