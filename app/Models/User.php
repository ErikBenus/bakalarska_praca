<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'birth_date',
        'gender',
        'dominant_hand',
        'dominant_leg',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function clientsData()
    {
        return $this->hasOne(ClientsData::class, 'client_id');
    }

    public function test()
    {
        return $this->hasMany(Test::class, 'client_id');
    }

    public function yBalanceTests()
    {
        return $this->hasMany(YBalanceTest::class, 'client_id');
    }

    public function maxPowerTests()
    {
        return $this->hasMany(MaxPowerTest::class, 'client_id');
    }
}
