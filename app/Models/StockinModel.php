<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockinModel extends Model
{
    protected $table = 'tblstockin';
    protected $fillable = [
        'POnumber'
    ];

    public $timestamps = true;

    // Define any relationships or additional methods here
}
