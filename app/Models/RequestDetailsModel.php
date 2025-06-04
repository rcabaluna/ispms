<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestDetailsModel extends Model
{
    protected $table = 'tblrequest_details';

     protected $primaryKey = 'requestdetailsid';


    protected $fillable = [
        'requestsummaryid',
        'stock_no',
        'quantity',
        'is_served'
    ];

    public $timestamps = false;

}
