<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValueLimb extends Model
{
    use HasFactory;

    protected $table = 'value_limb';

    protected $fillable = [
        'test_id',
        'id_limb',
        'value',
        'attempt',
        'avg_value',
        'weight',
        'y_balance_test_id',
        'max_power_test_id'
    ];

    public function test()
    {
        return $this->belongsTo(Test::class, 'test_id');
    }


    public function yBalanceTests()
    {
        return $this->belongsTo(YBalanceTest::class, 'y_balance_test_id');
    }

    public function maxPowerTests()
    {
        return $this->belongsTo(MaxPowerTest::class, 'max_power_test_id');
    }

    public function limb()
    {
        return $this->belongsTo(TestingLimb::class, 'id_limb');
    }
}
