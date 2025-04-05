<?php

use App\Http\Controllers\ClientsDataController;
use App\Http\Controllers\CreateNewTestController;
use App\Http\Controllers\ManageClientsController;
use App\Http\Controllers\Tests\YBalanceTestController;
use App\Models\Test;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Tests\EasyForceController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/api')->group(function () {
    Route::post('/all-clients', [ManageClientsController::class, 'store']);
    Route::get('/all-clients/{id}/edit', [ManageClientsController::class, 'edit']);
    Route::put('/all-clients/{id}', [ManageClientsController::class, 'update']);
    Route::delete('/all-clients/{id}', [ManageClientsController::class, 'destroy']);

    Route::get('/easy-force', [EasyForceController::class, 'index']);
    Route::get('/easy-force/{testId}', [EasyForceController::class, 'show']);
    Route::post('/easy-force', [EasyForceController::class, 'store']);

    Route::get('/clients/{clientId}/data', [ClientsDataController::class, 'show']);

    Route::post('/tests', [CreateNewTestController::class, 'store']);
    Route::post('/value-limb', function () {
        return response()->json([], 404);
    });

    Route::get('/y_balance_test', [YBalanceTestController::class, 'index']); // Získanie testov pre klienta
    Route::get('/y_balance_test/{testId}', [YBalanceTestController::class, 'show']); // Získanie detailu konkrétneho testu
    Route::post('/y_balance_test', [YBalanceTestController::class, 'store']); // Vytvorenie nového testu
    Route::put('/y_balance_test/{testId}', [YBalanceTestController::class, 'update']); // Aktualizovanie testu
});

