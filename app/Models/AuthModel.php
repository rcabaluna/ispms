<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class AuthModel extends Authenticatable
{
    protected $table = 'tbluseraccounts';

    protected $primaryKey = 'useraccountid';

    protected $fillable = [
        'username',
        'password',
    ];

    protected $hidden = [
        'password'
    ];
}
