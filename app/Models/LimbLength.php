<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LimbLength extends Model
{
    use HasFactory;

    protected $table = 'limb_lengths';

    protected $fillable = [
        'client_id',
        'limb_id',
        'length',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function limb()
    {
        return $this->belongsTo(TestingLimb::class, 'limb_id');
    }
}
