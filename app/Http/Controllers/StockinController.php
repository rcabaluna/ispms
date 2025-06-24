<?php

namespace App\Http\Controllers;

use App\Models\InventoryItemsModel;
use App\Models\Libraries\UOMModel;
use App\Models\StockinModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            'POnumber' => $ponumber,
        ]);

        foreach ($file as $row) {
            if (!empty($row['quantity']) && $row['quantity'] > 0) {

                $uom_trimmed = trim($row['uom']);
                $uom = UOMModel::where('name', $uom_trimmed)->first();

                if ($uom) {
                    $uomid = $uom['uomid'];
                } else {
                    $uom = UOMModel::where('name', 'piece')->first();
                    $uomid = $uom['uomid'];
                }

                InventoryItemsModel::create([
                    'stock_no' => $row['stock_no'],
                    'item' => $row['item'],
                    'quantity' => $row['quantity'],
                    'uomid' => $uomid,
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

        $items = DB::table('tblinventory_items as a')
        ->join('tbluom as b', 'b.uomid', '=', 'a.uomid')
        ->select('a.*', 'b.name as uom_name')
        ->where('a.POnumber', $stockin['POnumber'])
        ->get();


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
