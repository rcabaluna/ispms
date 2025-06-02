<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestSummaryModel extends Model
{
    protected $table = 'tblrequest_summary';
    protected $primaryKey = 'requestsummaryid';


    protected $fillable = [
        'requester',
        'supervisor',
        'remarks',
        'purpose',
        'xstatus',
        'requestdate',
        'created_at',
        'updated_at'

    ];

    public $timestamps = true;





}
