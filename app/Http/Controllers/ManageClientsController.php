<?php

namespace App\Http\Controllers;

use App\Models\ClientsData;
use App\Models\LimbLength;
use App\Models\Test;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

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
            'phone_number' => 'nullable|string|max:255',
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
            'right_arm_length' => 'nullable|numeric',
            'left_arm_length' => 'nullable|numeric',
            'right_leg_length' => 'nullable|numeric',
            'left_leg_length' => 'nullable|numeric',

        ]);

        try {
            DB::beginTransaction();

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
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

            if ($request->right_arm_length !== null) {
                LimbLength::create([
                    'client_id' => $user->id,
                    'limb_id' => 1, // Pravá ruka
                    'length' => $request->right_arm_length,
                ]);
            }
            if ($request->left_arm_length !== null) {
                LimbLength::create([
                    'client_id' => $user->id,
                    'limb_id' => 2, // Ľavá ruka
                    'length' => $request->left_arm_length,
                ]);
            }
            if ($request->right_leg_length !== null) {
                LimbLength::create([
                    'client_id' => $user->id,
                    'limb_id' => 3, // Pravá noha
                    'length' => $request->right_leg_length,
                ]);
            }
            if ($request->left_leg_length !== null) {
                LimbLength::create([
                    'client_id' => $user->id,
                    'limb_id' => 4, // Ľavá noha
                    'length' => $request->left_leg_length,
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Klient úspešne pridaný'], 201);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Chyba pri pridávaní klienta',
            ], 500);

        }

    }

    public function edit($id)
    {
        $user = User::with('clientsData')->find($id);

        if (!$user) {
            return response()->json(['message' => 'Klient nenájdený'], 404);
        }

        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'phone_number' => 'nullable|string|max:255',
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
            'right_arm_length' => 'nullable|numeric',
            'left_arm_length' => 'nullable|numeric',
            'right_leg_length' => 'nullable|numeric',
            'left_leg_length' => 'nullable|numeric',
        ]);

        try {
            DB::beginTransaction();

            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'Klient nenájdený'], 404);
            }

            $user->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'birth_date' => $request->birth_date,
                'gender' => $request->gender,
                'dominant_hand' => $request->dominant_hand,
                'dominant_leg' => $request->dominant_leg,
            ]);


            ClientsData::updateOrCreate(
                ['client_id' => $user->id],
                [
                    'sport' => $request->sport,
                    'weight' => $request->weight,
                    'height' => $request->height,
                    'body_fat_percent' => $request->body_fat_percent,
                    'muscle_mass' => $request->muscle_mass,
                    'bmi' => $request->bmi,
                ]
            );

            if ($request->right_arm_length !== null) {
                LimbLength::updateOrCreate(
                    ['client_id' => $user->id, 'limb_id' => 1], // Pravá ruka
                    ['length' => $request->right_arm_length]
                );
            } else {
                LimbLength::where(['client_id' => $user->id, 'limb_id' => 1])->delete();
            }

            if ($request->left_arm_length !== null) {
                LimbLength::updateOrCreate(
                    ['client_id' => $user->id, 'limb_id' => 2], // Ľavá ruka
                    ['length' => $request->left_arm_length]
                );
            } else {
                LimbLength::where(['client_id' => $user->id, 'limb_id' => 2])->delete();
            }

            if ($request->right_leg_length !== null) {
                LimbLength::updateOrCreate(
                    ['client_id' => $user->id, 'limb_id' => 3], // Pravá noha
                    ['length' => $request->right_leg_length]
                );
            } else {
                LimbLength::where(['client_id' => $user->id, 'limb_id' => 3])->delete();
            }

            if ($request->left_leg_length !== null) {
                LimbLength::updateOrCreate(
                    ['client_id' => $user->id, 'limb_id' => 4], // Ľavá noha
                    ['length' => $request->left_leg_length]
                );
            } else {
                LimbLength::where(['client_id' => $user->id, 'limb_id' => 4])->delete();
            }

            DB::commit();

            return response()->json(['message' => 'Klient úspešne aktualizovaný'], 200);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Chyba pri aktualizácii klienta'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'Klient nenájdený'], 404);
            }

            $user->delete();

            DB::commit();

            return response()->json(['message' => 'Klient úspešne odstránený'], 200);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Chyba pri odstraňovaní klienta'], 500);
        }
    }

    public function show($clientId)
    {
        $client = User::find($clientId);
        $tests = Test::where('client_id', $clientId)->get();

        return Inertia::render('Clients/ClientDetails', [
            'client' => $client,
            'tests' => $tests,
            'clientId' => $clientId,
        ]);
    }


}

