<?php

namespace App\Http\Controllers;

use App\Models\LimbLength;
use Illuminate\Http\Request;
use App\Models\ClientsData;

class ClientsDataController extends Controller
{
    public function show($clientId)
    {
        $clientData = ClientsData::where('client_id', $clientId)->first();

        if (!$clientData) {
            return response()->json(['message' => 'Žiadne dáta pre klienta'], 404);
        }

        // Načítanie dĺžok končatín
        $limbLengths = LimbLength::where('client_id', $clientId)->get();

        // Pridanie dĺžok končatín do odpovede
        $clientData->limb_lengths = $limbLengths;

        return response()->json($clientData);
    }
}
