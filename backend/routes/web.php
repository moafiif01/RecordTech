<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response('RecordTech backend is running.');
});

// Provide SPA login endpoint under web middleware so session is available
use App\Http\Controllers\AuthController;
Route::post('/api/login', [AuthController::class, 'login']);
