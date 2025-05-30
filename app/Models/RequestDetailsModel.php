<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestDetailsModel extends Model
{
    protected $table = 'tblrequest_details';

    protected $fillable = [
        'requestsummaryid',
        'stock_no',
        'quantity'
    ];

    public $timestamps = false;

}
