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
            'ponumber' => 'required|unique:tblstockin,ponumber',
            'excel_data' => 'required|array',
        ], [
            'ponumber.unique' => 'PO Number already exists.'
        ]);

        $ponumber = $request->input('ponumber');
        $file = $request->input('excel_data');

        StockinModel::create([
            'ponumber' => $ponumber,
        ]);

        foreach ($file as $row) {
            if (!empty($row['quantity']) && $row['quantity'] > 0) {
                InventoryItemsModel::create([
                    'stock_no' => $row['stock_no'],
                    'item' => $row['item'],
                    'quantity' => $row['quantity'],
                    'unit_cost' => $row['unit_cost'],
                    'uacs_code' => $row['uacs_code'] ?? null,
                    'POnumber' => $ponumber
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

   
   
        $items = InventoryItemsModel::where('POnumber', $stockin['POnumber'])->get();


        return inertia('stock-in/Partials/ItemsList', [
            'items' => $items, 'stockin' => $stockin
        ]);
    }

    public function update(Request $request, string $stockinid)
    {

        $ponumber = $request->input('ponumber');

        
        $request->validate([
            'ponumber' => 'required|unique:tblstockin,ponumber',
        ], [
            'ponumber.unique' => 'PO Number already exists.'
        ]);

       
        StockinModel::where('stockinid', $stockinid)->update([
            'ponumber' => $ponumber,
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
