<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    public function run()
    {
        Admin::updateOrCreate(
            ['email' => 'recordtechsarlau@gmail.com'],
            [
                'name' => 'moncef',
                'password' => Hash::make('recordtech123'),
            ]
        );
    }
}
