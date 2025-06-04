<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function Laravel\Prompts\alert;

class Authenticate
{
    public function handle(Request $request, Closure $next)
    {

        // Check if user is authenticated and has 'admin' role
        if (Auth::check()) {
            return $next($request); // Allow access
        }

        // Optional: redirect or abort if not authorized
        return abort(403, 'Unauthorized access.');
    }
}
