<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ContactController;

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Return the currently authenticated admin (used by the SPA to check login state)
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Public read endpoints
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

// Protected write endpoints
Route::middleware('auth:sanctum')->group(function () {
	Route::post('/services', [ServiceController::class, 'store']);
	Route::put('/services/{id}', [ServiceController::class, 'update']);
	Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
	Route::get('/contacts', [ContactController::class, 'index']);
	Route::put('/contacts/{id}/read', [ContactController::class, 'markAsRead']);
	Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);
});

Route::post('/contact', [ContactController::class, 'store']);

