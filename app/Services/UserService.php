<?php

namespace App\Services;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class UserService
{
    public function __construct(protected UserRepository $userRespository)
    {
        $this->userRespository = $userRespository;
    }

    public function paginate(int $perPage)
    {
        return $this->userRespository->paginate($perPage);
    }

    public function store(array $storeUserRequest)
    {
        Session::flash('success', 'User created');

        $storeUserRequest['master_id'] = Auth::user()->id;
        
        return $this->userRespository->store($storeUserRequest);
    }

    public function update(array $updateUserRequest, User $user)
    {
        Session::flash('success', 'User updated');
        return $this->userRespository->update($user->id, $updateUserRequest);
    }

    public function delete(int $userId)
    {
        Session::flash('success', 'User deleted');
        return $this->userRespository->delete($userId);
    }
}