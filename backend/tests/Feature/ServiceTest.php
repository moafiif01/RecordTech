<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Admin;
use App\Models\Service;
use Illuminate\Support\Facades\Hash;

class ServiceTest extends TestCase
{
    use RefreshDatabase;

    protected function loginAdmin()
    {
        $admin = Admin::create([
            'name' => 'Admin',
            'email' => 'admin@test.local',
            'password' => Hash::make('secret'),
        ]);

        $this->get('/sanctum/csrf-cookie');
        $this->postJson('/api/login', ['email' => 'admin@test.local', 'password' => 'secret']);

        return $admin;
    }

    public function test_public_can_view_services()
    {
        Service::create(['title' => 'S1', 'description' => 'D1']);
        $resp = $this->getJson('/api/services');
        $resp->assertStatus(200)->assertJsonCount(1);
    }

    public function test_protected_create_update_delete()
    {
        $this->loginAdmin();

        $resp = $this->postJson('/api/services', ['title' => 'New', 'description' => 'Desc']);
        $resp->assertStatus(201)->assertJson(['title' => 'New']);

        $id = $resp->json('id');

        $this->putJson("/api/services/{$id}", ['title' => 'Updated']);
        $this->assertDatabaseHas('services', ['id' => $id, 'title' => 'Updated']);

        $this->deleteJson("/api/services/{$id}");
        $this->assertDatabaseMissing('services', ['id' => $id]);
    }
}
