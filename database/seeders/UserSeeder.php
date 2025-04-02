<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $user = User::create([
            'first_name' => 'Erik',
            'last_name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->save();

        $user = User::create([
            'first_name' => 'Mário',
            'last_name' => 'Trainer',
            'email' => 'trainer@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->save();

        $user = User::create([
            'first_name' => 'Filip',
            'last_name' => 'Client',
            'email' => 'client@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->save();


    }
}
