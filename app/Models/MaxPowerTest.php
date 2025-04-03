<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaxPowerTest extends Model
{
    use HasFactory;

    protected $table = 'max_power_test';

    protected $fillable = [
        'client_id',
        'exercise_name'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function valueLimb()
    {
        return $this->hasMany(ValueLimb::class, 'test_id');
    }
}
