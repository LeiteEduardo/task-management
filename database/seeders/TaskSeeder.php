<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $masterUser = User::where('role', 'master')->inRandomOrder()->first();

        Task::factory()->count(5)->create(['user_id' => $masterUser->id])->each(function ($task) use ($masterUser) {
            $regularUsers = $masterUser->regulars;

            if ($regularUsers->isNotEmpty()) {
                $regularUserIds = $regularUsers->pluck('id')->random(mt_rand(1, $regularUsers->count()));

                $task->users()->attach($regularUserIds);
            }
        });
    }
}
