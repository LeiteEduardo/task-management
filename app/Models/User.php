<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'master_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function master()
    {
        return $this->belongsTo(User::class);
    }

    public function regulars()
    {
        return $this->hasMany(User::class, 'master_id');
    }

    public function team()
    {
        $currentUser = Auth::user();

        // Obtém a coleção de usuários regulares existente
        $regularsCollection = $currentUser->regulars;

        // Adiciona o usuário autenticado à coleção existente
        $regularsCollection->push($currentUser);

        return $regularsCollection;
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class);
    }
}
