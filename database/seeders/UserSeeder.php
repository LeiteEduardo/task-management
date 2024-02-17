<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $masterUser = User::factory()->create([
            'name'      => 'Admin ' . fake()->name,
            'email'     => 'admin@email.com',
            'role'      => 'master',
            'password'  => '123456789'
        ]);

        User::factory()->count(3)->create([
            'master_id' => $masterUser->id,
            'role' => 'regular',
        ]);
    }
}
