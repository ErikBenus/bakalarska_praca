<?php

namespace App\Http\Controllers;

use App\Models\Conclusion;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class ConclusionController extends Controller
{
    public function index(Request $request)
    {
        $query = Conclusion::with('client')->latest();

        if ($request->has('client_id')) {
            $query->where('client_id', $request->input('client_id'));
        }

        $conclusions = $query->get();

        return response()->json($conclusions);
    }


    public function show($id)
    {
        $conclusion = Conclusion::with('client')->findOrFail($id);
        return response()->json($conclusion);
    }

    public function store(Request $request)
    {
        $request->validate([
            'client_id' => ['required', 'exists:users,id'],
            'final_outcome' => 'required|string',
            'testing_date' => 'required|date',
        ]);

        $client = User::findOrFail($request->client_id);

        if (!$client->hasRole('client')) {
            return response()->json(['error' => 'Používateľ nie je klient.'], 403);
        }

        $conclusion = Conclusion::create($request->all());

        return response()->json($conclusion, 201);
    }

    public function update(Request $request, $id)
    {
        $conclusion = Conclusion::findOrFail($id);

        $request->validate([
            'final_outcome' => 'required|string',
            'testing_date' => 'required|date',
        ]);

        $conclusion->update($request->only(['final_outcome', 'testing_date']));

        return response()->json($conclusion);
    }

    public function destroy($id)
    {
        $conclusion = Conclusion::findOrFail($id);
        $conclusion->delete();

        return response()->json(null, 204);
    }

    public function clientsOnly()
    {
        $clientRole = Role::where('name', 'client')->first();

        if (!$clientRole) {
            return response()->json([]);
        }

        $clients = User::role($clientRole->name)->get();
        return response()->json($clients);
    }

    public function clientView($clientId)
    {
        $client = User::findOrFail($clientId);

        if (!$client->hasRole('client')) {
            abort(403);
        }

        $conclusions = Conclusion::where('client_id', $client->id)->get();

        return Inertia::render('Clients/ClientView', [
            'clientId' => $client->id,
            'clientName' => $client->first_name . ' ' . $client->last_name,
            'conclusions' => $conclusions,
        ]);
    }
}
