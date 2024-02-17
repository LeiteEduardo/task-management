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
            'name'      => 'Admin',
            'email'     => 'admin@email.com',
            'password'  => '123456789',
        ]);

        User::factory()->create([
            'name'      => 'Regular',
            'email'     => 'regular@email.com',
            'password'  => '123456789',
            'role'      => 'regular',
            'master_id' => $masterUser->id,
        ]);
    }
}
