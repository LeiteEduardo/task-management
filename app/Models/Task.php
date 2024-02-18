<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'finish_date',
        'status',
        'observation',
        'user_id'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function master()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getStartDateAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function getFormattedStartDate(): ?string
    {
        return Carbon::parse($this->attributes['start_date'])->format('d/m/Y');
    }

    public function getEndDateAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function getFormattedEndDate(): ?string
    {
        return Carbon::parse($this->attributes['end_date'])->format('d/m/Y');
    }

    public function getFinishDateAttribute($value)
    {
        if ($value === null) {
            return null;
        }

        return Carbon::parse($value)->format('Y-m-d');
    }
}
