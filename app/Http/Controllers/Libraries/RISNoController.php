<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\RISNoModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RISNoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get RIS numbers and key them by empnumber for fast lookup
        $risnos = RISNoModel::get()->keyBy('empnumber');

        // Get employees as a collection (from second DB)
        $employees = collect(DB::connection('mysql2')
            ->table('tblemppersonal as a')
            ->join('tblempposition as b', 'b.empNumber', '=', 'a.empNumber')
            ->where('b.appointmentCode', 'P')
            ->where('a.empNumber', '!=', '1111')
            ->select('a.empNumber', 'a.firstname', 'a.surname', 'a.middlename', 'a.nameExtension')
            ->orderBy('a.surname','ASC')
            ->get());

        // Build new employee array with 'risno' attached
        $mergedEmployees = $employees->map(function ($employee) use ($risnos) {
            $emp = (array) $employee; // convert stdClass to array
            $risno = $risnos->get($employee->empNumber);

            // Attach only the risno value, or null if not found
            $emp['risno'] = $risno ? $risno->risno : '';

            return $emp;
        });

        // Return to Inertia with merged employees
        return inertia('libraries/risno/page', [
            'employees' => $mergedEmployees
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $empnumber)
    {
        $data = $request->all();

        if ($data['risno'] == '' || $data['risno'] == null) {
            RISNoModel::where('empnumber', $empnumber)->delete();
        } else {
            RISNoModel::updateOrCreate(
                ['empnumber' => $empnumber],
                ['risno' => $data['risno']]
            );
        }

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
