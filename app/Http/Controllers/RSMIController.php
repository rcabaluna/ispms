<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RSMIController extends Controller
{
    public function index()
    {
        return inertia('reports/rsmi/page',[]);
    }
}
