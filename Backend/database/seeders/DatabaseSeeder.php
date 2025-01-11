<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Database\Seeders\UsersTableSeeder as SeedersUsersTableSeeder;
use Illuminate\Database\Seeder;
use UsersTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(FoodSeeder::class);
        $this->call(TagSeeder::class);

        $this->call(SeedersUsersTableSeeder::class);
        $this->call(OrdersTableSeeder::class);
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
