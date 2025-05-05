<?php

namespace App\Http\Controllers;

use App\Models\ClientsData;
use App\Models\LimbLength;
use App\Models\User;

class ClientsDataController extends Controller
{
    public function show($clientId)
    {
        $clientData = ClientsData::where('client_id', $clientId)->first();

        if (!$clientData) {
            return response()->json(['message' => 'Žiadne dáta pre klienta'], 404);
        }

        $limbLengths = LimbLength::where('client_id', $clientId)->get();

        $clientData->limb_lengths = $limbLengths;

        $user = User::find($clientId);
        if ($user) {
            $clientData->birth_date = $user->birth_date;
            $clientData->first_name = $user->first_name;
            $clientData->last_name = $user->last_name;
        }

        return response()->json($clientData);
    }
}
