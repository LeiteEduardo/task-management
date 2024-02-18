<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\TaskUser;
use Illuminate\Support\Facades\Auth;

class TaskRepository extends BaseRepository
{
    public function __construct(protected Task $task, protected TaskUser $taskUser)
    {
        parent::__construct($task);
        $this->taskUser = $taskUser;
    }

    public function paginate(int $perPage = 15): object
    {
        return $this->obj->where('user_id', Auth::user()->id)->paginate($perPage);
    }

    public function allTaskUsers(int $taskId)
    {
        return $this->taskUser->where('task_id', $taskId)->get();
    }

    public function storeTaskUsers(array $users, int $taskId): bool
    {
        foreach ($users as $user) {
            $this->taskUser->create([
                'task_id' => $taskId,
                'user_id' => $user
            ]);
        }
        
        return true;
    }
}
