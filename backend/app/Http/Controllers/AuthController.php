<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($data)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $request->session()->regenerate();

        return response()->json(['message' => 'Logged in'], 200);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out'], 200);
    }

    // Return authenticated user
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
