<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    protected $except = [
        // Allow Sanctum CSRF endpoint for SPA authentication flow
        'sanctum/csrf-cookie',
        'api/contact',
    ];
}
