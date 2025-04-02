<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YBalanceTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'name',
        'absolute_value'
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
