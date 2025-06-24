<?php

namespace App\Http\Controllers\Libraries;

use App\Http\Controllers\Controller;
use App\Models\Libraries\UOMModel;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UOMController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $uoms = UOMModel::get();

        return inertia('libraries/uom/page',['uoms' => $uoms]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => "required",
            "abbreviation" => "required",
        ]);

        UOMModel::create($data);

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
    public function update(Request $request, string $uomid)
    {
        // Validate input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Find the existing record
        $uom = UOMModel::findOrFail($uomid);

        // Check if another record with the same name exists
        $exists = UOMModel::where('name', $validated['name'])
            ->where('uomid', '!=', $uomid)
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'message' => ['The UOM "' . $validated['name'] . '" already exists.'],
            ]);
        }

        // Update the record
        $uom->name = $validated['name'];
        $uom->save();

        return back()->with('message', 'Stock-in data has been updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
