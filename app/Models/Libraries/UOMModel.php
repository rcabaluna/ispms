<?php

namespace App\Models\Libraries;

use Illuminate\Database\Eloquent\Model;

class UOMModel extends Model
{
    protected $table = 'tbluom';

    protected $primaryKey = 'uomid';

    public $timestamps = false;

    public $fillable = [
        'name',
        'abbreviation'
    ];
}
