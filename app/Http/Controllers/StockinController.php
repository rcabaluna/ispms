<?php

namespace App\Http\Controllers;

use App\Models\InventoryItemsModel;
use App\Models\StockinModel;
use Illuminate\Http\Request;

class StockinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stockins = StockinModel::orderBy('stockinid', 'DESC')->get();
        return inertia('stock-in/page', [
            'stockins' => $stockins,
        ]); 
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'serial_number' => 'required|unique:tblstockin,serialnumber',
            'excel_data' => 'required|array',
        ], [
            'serial_number.unique' => 'Serial number already exists.'
        ]);

        $serialnumber = $request->input('serial_number');
        $file = $request->input('excel_data');

        StockinModel::create([
            'serialnumber' => $serialnumber,
        ]);

        foreach ($file as $row) {
            if (!empty($row['quantity']) && $row['quantity'] > 0) {
                InventoryItemsModel::create([
                    'stock_no' => $row['stock_no'],
                    'item' => $row['item'],
                    'quantity' => $row['quantity'],
                    'unit_cost' => $row['unit_cost'],
                    'uacs_code' => $row['uacs_code'] ?? null,
                    'serialnumber' => $serialnumber
                ]);
            }
        }

        return back()->with('message', 'Stock-in data has been uploaded successfully.');
    }




    /**
     * Display the specified resource.
     */
    public function show(int $stockinid)
    {
        $stockin = StockinModel::where('stockinid', $stockinid)->get()->first();

   
        $items = InventoryItemsModel::where('serialnumber', $stockin['serialnumber'])->get();

        return inertia('stock-in/Partials/ItemsList', [
            'items' => $items, 'stockin' => $stockin
        ]);
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
    public function update(Request $request, string $stockinid)
    {

        $serialnumber = $request->input('serial_number');

        
        $request->validate([
            'serial_number' => 'required|unique:tblstockin,serialnumber',
        ], [
            'serial_number.unique' => 'Serial number already exists.'
        ]);

       
        StockinModel::where('stockinid', $stockinid)->update([
            'serialnumber' => $serialnumber,
        ]);


        return back()->with('message', 'Stock-in data has been updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $stock_in)
    {
        StockinModel::where('stockinid', $stock_in)->delete();
        return redirect()->back()->with('message', 'Stock-in data has been deleted successfully.');

    }
}
