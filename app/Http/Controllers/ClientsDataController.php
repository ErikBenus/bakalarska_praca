<?php

namespace App\Http\Controllers;

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

        return response()->json($clientData);
    }
}
