<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ManageTrainersController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $trainers = User::role('trainer')->select('id', 'first_name', 'last_name', 'email')->get();

        return Inertia::render('Trainers/Index', [
            'trainers' => $trainers,
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
            ]);

            $user->save();

            $user->assignRole('trainer');

            DB::commit();

            return response()->json(['message' => 'Tréner úspešne pridaný'], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Chyba pri pridávaní trénera',
            ], 500);
        }
    }

    public function edit($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Tréner nenájdený'], 404);
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
        ]);

        try {
            DB::beginTransaction();

            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'Tréner nenájdený'], 404);
            }

            $user->update([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'birth_date' => $request->birth_date,
                'gender' => $request->gender,
            ]);

            DB::commit();

            return response()->json(['message' => 'Tréner úspešne aktualizovaný'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Chyba pri aktualizácii trénera'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'Tréner nenájdený'], 404);
            }

            $user->delete();

            DB::commit();

            return response()->json(['message' => 'Tréner úspešne odstránený'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Chyba pri odstraňovaní trénera'], 500);
        }
    }

    public function promoteToAdmin($id)
    {
        try {
            DB::beginTransaction();

            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'Tréner nenájdený'], 404);
            }

            $user->removeRole('trainer');
            $user->assignRole('admin');

            DB::commit();

            return response()->json(['message' => 'Tréner úspešne povýšený na admina'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Chyba pri povýšení trénera na admina'], 500);
        }
    }
}
