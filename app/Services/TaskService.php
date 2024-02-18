<?php

namespace App\Services;

use App\Models\Task;
use App\Repositories\TaskRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class TaskService
{
    public function __construct(
        protected TaskRepository $taskRespository
    )
    {
        $this->taskRespository = $taskRespository;
    }

    public function paginate(int $perPage)
    {
        $tasks = $this->taskRespository->paginate($perPage);

        $statusColors = [
            'Not Started'   => 'secondary', 
            'In Progress'   => 'warning', 
            'Completed'     => 'success'
        ];

        $tasks->each(function ($task) use ($statusColors) {
            $task->color = $statusColors[$task->status];

            if ( now() > $task->end_date && $task->status != 'Completed' )
            {
                $task->status = 'Overdue';
                $task->color = 'danger';
            }
        });

        return $tasks;
    }

    public function store(array $storeTaskRequest)
    {
        $storeTaskRequest['user_id'] = Auth::user()->id;
        
        $task = $this->taskRespository->store($storeTaskRequest);
        
        $this->taskRespository->storeTaskUsers($storeTaskRequest['responsible'], $task->id);
        
        Session::flash('success', 'Task created');

        return $task;
    }

    public function update(array $updateTaskRequest, Task $task)
    {
        $this->taskRespository->update($task->id, $updateTaskRequest);

        $taskUsers = $this->taskRespository->allTaskUsers($task->id);

        foreach ($taskUsers as $taskUser) {
            if (in_array($taskUser['user_id'], $updateTaskRequest['responsible'])) {
                $key = array_search($taskUser['user_id'], $updateTaskRequest['responsible']);
                unset($updateTaskRequest['responsible'][$key]);
            } else {
                $taskUser->delete();
            }
        }

        $this->taskRespository->storeTaskUsers($updateTaskRequest['responsible'], $task->id);

        Session::flash('success', 'Task updated');
        
        return $task;
    }
}
