<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;

class TrainerDashboardController extends Controller
{
    public function index()
    {
        try {
            $clientCount = User::whereHas('roles', function ($query) {
                $query->where('name', 'client');
            })->count();

            $testCount = Test::count();

            $latestClients = User::whereHas('roles', function ($query) {
                $query->where('name', 'client');
            })->latest()->take(5)->get();

            $latestTests = Test::whereHas('user', function ($query) {
                $query->whereHas('roles', function ($query) {
                    $query->where('name', 'client');
                });
            })->with('user')->latest()->take(5)->get();

            return response()->json([
                'clientCount' => $clientCount,
                'testCount' => $testCount,
                'latestClients' => $latestClients,
                'latestTests' => $latestTests,
            ]);
        } catch (Exception $e) {
            Log::error('Chyba v TrainerDashboardController: ' . $e->getMessage());
            return response()->json(['error' => 'Interná chyba servera'], 500);
        }
    }
}
