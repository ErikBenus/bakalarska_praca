<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestingLimb extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function valueLimb()
    {
        return $this->hasMany(ValueLimb::class, 'id_limb');
    }
}
