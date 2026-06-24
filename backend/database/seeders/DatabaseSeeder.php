<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            AdminSeeder::class,
            \Database\Seeders\StatutServicesSeeder::class,
        ]);
    }
}
