<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conclusion extends Model
{
    use HasFactory;

    protected $table = 'conclusions';

    protected $fillable = [
        'client_id',
        'final_outcome',
        'testing_date',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
