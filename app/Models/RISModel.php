<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RISModel extends Model
{
    protected $table = 'tblris';

    protected $fillable = [
        'empNumber',
        'stock_no',
        'quantity',
        'year',
        'month',
    ];

    public $timestamps = true;
}
