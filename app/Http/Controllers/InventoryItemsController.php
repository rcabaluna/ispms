<?php

namespace App\Http\Controllers;

use App\Models\InventoryItemsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = DB::table('tblinventory_items')
    ->select(
        'stock_no',
        'item',
        DB::raw('ROUND(SUM(quantity), 0) AS total_quantity'),
        DB::raw('(SELECT COALESCE(SUM(b.quantity), 0) FROM tblrequest_details b WHERE b.is_served = 1 AND b.stock_no = tblinventory_items.stock_no) AS served_quantity'),
        DB::raw('(ROUND(SUM(quantity), 0) - (SELECT COALESCE(SUM(b.quantity), 0) FROM tblrequest_details b WHERE b.is_served = 1 AND b.stock_no = tblinventory_items.stock_no)) AS remaining_quantity'),
        DB::raw('ROUND(AVG(unit_cost), 2) AS average_cost')
    )
    ->groupBy('stock_no', 'item')
    ->get();


        return inertia('inventory-items/page', [
            'items' => $items,
        ]);
    }

    public function getItemsBreakDown(Request $request)
    {
        $request->validate([
            'stock_no' => 'required|string',
        ]);

        $stock_no = $request->input('stock_no');

        $items = DB::table('tblinventory_items as a')
            ->join('tblstockin as b', 'b.ponumber', '=', 'a.ponumber')
            ->select('a.*', 'b.created_at')
            ->where('a.stock_no', $stock_no)
            ->orderBy('b.created_at', 'desc')
            ->get();

        return response()->json($items);
    }

    public function update(Request $request, string $invitemsid)
    {

        InventoryItemsModel::where('invitemsid', $invitemsid)->update([
            'quantity' => (float)$request->input('quantity'),
            'unit_cost' => (float)$request->input('unit_cost'),
        ]);

        return redirect()->back()->with('message', 'The item details has been updated successfully.');
    }

    public function destroy(string $invitemsid)
    {
        InventoryItemsModel::where('invitemsid', $invitemsid)->delete();
        return redirect()->back()->with('message', 'The item has been deleted successfully.');
    }

    public function availabeItems(){
        // Step 1: Get total inventory quantities
        $inventoryTotals = DB::table('tblinventory_items')
            ->select('stock_no', 'item', DB::raw('SUM(quantity) as total_quantity'))
            ->groupBy('stock_no', 'item');

        // Step 2: Get total issued quantities
        $issuedTotals = DB::table('tblris')
            ->select('stock_no', DB::raw('SUM(quantity) as issued_quantity'))
            ->groupBy('stock_no');

        // Step 3: Join inventory with issued and calculate remaining
        $results = DB::table(DB::raw("({$inventoryTotals->toSql()}) as inv"))
            ->mergeBindings($inventoryTotals) // important to merge bindings
            ->leftJoinSub($issuedTotals, 'iss', 'inv.stock_no', '=', 'iss.stock_no')
            ->select(
                'inv.stock_no',
                'inv.item',
                DB::raw('ROUND(inv.total_quantity, 0) as total_quantity'),
                DB::raw('COALESCE(ROUND(iss.issued_quantity, 0), 0) as issued_quantity'),
                DB::raw('ROUND(inv.total_quantity - COALESCE(iss.issued_quantity, 0), 0) as remaining_quantity')
            )
            ->get();

            return response()->json($results);
    }
}
