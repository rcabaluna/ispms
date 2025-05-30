<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
        return inertia('login/page');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            return redirect()->intended('/inventory/items');
        }else {
            return back()->withErrors([
                'invalid' => 'Invalid username or password.',
            ])->onlyInput('username');
        }

        
    }

}
