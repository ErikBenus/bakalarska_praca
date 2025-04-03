<?php

namespace App\Http\Controllers;

use App\Models\ClientsData;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ManageClientsController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $clients = User::role('client')->select('id', 'first_name', 'last_name', 'email')->get();

        return Inertia::render('Clients/Index', [
            'clients' => $clients,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'birth_date' => 'required|date',
            'gender' => 'required|string',
            'dominant_hand' => 'nullable|string',
            'dominant_leg' => 'nullable|string',
            'sport' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'height' => 'nullable|numeric',
            'body_fat_percent' => 'nullable|numeric',
            'muscle_mass' => 'nullable|numeric',
            'bmi' => 'nullable|numeric',
        ]);

        try {
            DB::beginTransaction();

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make('password'),
                'birth_date' => $request->birth_date,
                'gender' => $request->gender,
                'dominant_hand' => $request->dominant_hand,
                'dominant_leg' => $request->dominant_leg,
            ]);


            $user->save();

            $user->assignRole('client');

            ClientsData::create([
                'client_id' => $user->id,
                'sport' => $request->sport,
                'weight' => $request->weight,
                'height' => $request->height,
                'body_fat_percent' => $request->body_fat_percent,
                'muscle_mass' => $request->muscle_mass,
                'bmi' => $request->bmi,
            ]);

            DB::commit();

            return response()->json(['message' => 'Klient úspešne pridaný'], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Chyba pri pridávaní klienta',
            ], 500);

        }

    }
}
