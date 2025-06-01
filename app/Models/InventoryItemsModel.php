<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryItemsModel extends Model
{
    protected $table = 'tblinventory_items';
    protected $fillable = [
        'invitemsid',
        'stock_no',
        'item',
        'quantity',
        'unit_cost',
        'uacs_code',
        'POnumber',
    ];

    public $timestamps = false;

    // Define any relationships or additional methods here
}
