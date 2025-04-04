<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientsData extends Model
{
    use HasFactory;

    protected $table = 'clients_data';
    protected $fillable = [
        'client_id',
        'sport',
        'weight',
        'height',
        'body_fat_percent',
        'muscle_mass',
        'bmi'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
}
