<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class RISNoModel extends Model
{
    protected $table = 'tblemprisno';
    protected $primaryKey = 'emprisnoid';
    public $timestamps = false;

    protected $fillable = [
        'empnumber',
        'risno',
    ];
}
