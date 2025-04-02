<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValueLimb extends Model
{
    use HasFactory;

    protected $fillable = [
        'test_id',
        'id_limb',
        'value',
        'attempt',
        'avg_value',
        'weight'
    ];

    public function test()
    {
        return $this->belongsTo(Test::class, 'test_id');
    }

    public function limb()
    {
        return $this->belongsTo(TestingLimb::class, 'id_limb');
    }
}
