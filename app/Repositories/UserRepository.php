<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepository extends BaseRepository
{
    public function __construct(protected User $user)
    {
        parent::__construct($user);
    }

    public function paginate(int $perPage = 15): object
    {
        return $this->obj->where('master_id', Auth::user()->id)->orWhere('id', Auth::user()->id)->paginate($perPage);
    }
}
