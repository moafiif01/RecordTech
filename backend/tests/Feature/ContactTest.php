<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Mail;
use App\Models\Contact;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_saves_and_sends_mail()
    {
        Mail::fake();

        $payload = ['name' => 'Jane', 'email' => 'jane@test.local', 'message' => 'Hello'];

        $resp = $this->postJson('/api/contact', $payload);

        $resp->assertStatus(201);

        $this->assertDatabaseHas('contacts', ['email' => 'jane@test.local', 'name' => 'Jane']);
    }
}
