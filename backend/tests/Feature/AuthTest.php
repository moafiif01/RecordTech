<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_login()
    {
        Admin::create([
            'name' => 'Admin',
            'email' => 'admin@test.local',
            'password' => Hash::make('secret'),
        ]);

        // Get CSRF cookie
        $this->get('/sanctum/csrf-cookie');

        $resp = $this->postJson('/api/login', ['email' => 'admin@test.local', 'password' => 'secret']);
        $resp->assertStatus(200)->assertJson(['message' => 'Logged in']);
    }

    public function test_invalid_credentials_return_401()
    {
        $resp = $this->postJson('/api/login', ['email' => 'nope@test.local', 'password' => 'bad']);
        $resp->assertStatus(401);
    }
}
