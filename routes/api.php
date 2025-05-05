<?php

use App\Http\Controllers\AllTestsController;
use App\Http\Controllers\ClientsDataController;
use App\Http\Controllers\ConclusionController;
use App\Http\Controllers\CreateNewTestController;
use App\Http\Controllers\ManageClientsController;
use App\Http\Controllers\ManageTrainersController;
use App\Http\Controllers\Tests\MaxPowerTestController;
use App\Http\Controllers\Tests\YBalanceTestController;
use App\Http\Controllers\TrainerDashboardController;
use Illuminate\Support\Facades\Route;


Route::prefix('/api')->middleware('auth')->group(function () {
    // Klienti (Clients)
    // GET metódy
    Route::get('/all-clients/{id}/edit', [ManageClientsController::class, 'edit']); // Zobrazenie formulára pre úpravu klienta
    // POST metódy
    Route::post('/all-clients', [ManageClientsController::class, 'store']); // Vytvorenie nového klienta
    Route::put('/all-clients/{id}', [ManageClientsController::class, 'update']); // Aktualizácia existujúceho klienta
    Route::delete('/all-clients/{id}', [ManageClientsController::class, 'destroy']); // Odstránenie klienta

    // Dáta klientov (Clients Data)
    // GET metódy
    Route::get('/clients/{clientId}/data', [ClientsDataController::class, 'show']); // Získanie dát konkrétneho klienta

    // Testy (Tests - všeobecné)
    // GET metódy
    Route::get('/tests/{categorySlug}', [CreateNewTestController::class, 'index']); // Získanie testov podľa kategórie
    Route::get('/tests/{categorySlug}/{testId}', [CreateNewTestController::class, 'show']); // Získanie konkrétneho testu podľa kategórie a ID
    // POST metódy
    Route::post('/tests', [CreateNewTestController::class, 'store']); // Vytvorenie nového testu

    // POST metódy
    Route::post('/value-limb', function () {
        return response()->json([], 404);
    });

    // Y-Balance Test
    // GET metódy
    Route::get('/y-balance-test', [YBalanceTestController::class, 'index']); // Získanie Y-Balance testov pre klienta
    Route::get('/y-balance-test/{id}', [YBalanceTestController::class, 'show']); // Získanie konkrétneho Y-Balance testu
    Route::get('/composite-distance', [YBalanceTestController::class, 'getCompositeDistance']); // Získanie vzdialenosti Y-Balance testu
    // POST metódy
    Route::post('/y-balance-test', [YBalanceTestController::class, 'store']); // Uloženie nového Y-Balance testu

    // Tréneri (Trainers)
    // GET metódy
    Route::get('/all-trainers/{id}/edit', [ManageTrainersController::class, 'edit']); // Zobrazenie formulára pre úpravu trénera
    // POST metódy
    Route::post('/all-trainers', [ManageTrainersController::class, 'store']); // Vytvorenie nového trénera
    Route::put('/all-trainers/{id}', [ManageTrainersController::class, 'update']); // Aktualizácia existujúceho trénera
    Route::delete('/all-trainers/{id}', [ManageTrainersController::class, 'destroy']); // Odstránenie trénera
    Route::post('/all-trainers/{id}/promote', [ManageTrainersController::class, 'promoteToAdmin']); // Povýšenie trénera na admina

    // Max Power Test
    // GET metódy
    Route::get('/max-power-tests', [MaxPowerTestController::class, 'index']); // Získanie Max Power testov pre klienta
    Route::get('/max-power-tests/{id}', [MaxPowerTestController::class, 'show']); // Získanie konkrétneho Max Power testu
    // POST metódy
    Route::post('/max-power-tests', [MaxPowerTestController::class, 'store']); // Uloženie nového Max Power testu

    // Všetky testy (All Tests)
    // GET metódy
    Route::get('/client/{clientId}/all-tests', [AllTestsController::class, 'showHistory']); // Získanie histórie všetkých testov pre klienta
    Route::get('/trainer/all-clients-tests', [AllTestsController::class, 'showAllClientsTests']); // Získanie všetkých testov všetkých klientov pre trénera

    // Závery (Conclusions)
    // GET metódy
    Route::get('/conclusions', [ConclusionController::class, 'index']); // Získanie všetkých záverov
    Route::get('/conclusions/{id}', [ConclusionController::class, 'show']); // Získanie konkrétneho záveru
    Route::get('/clients', [ConclusionController::class, 'clientsOnly']); // Získanie len klientov so závermi
    // POST metódy
    Route::post('/conclusions', [ConclusionController::class, 'store']); // Uloženie nového záveru
    Route::put('/conclusions/{id}', [ConclusionController::class, 'update']); // Aktualizácia existujúceho záveru
    Route::delete('/conclusions/{id}', [ConclusionController::class, 'destroy']); // Odstránenie záveru

    // Dashboard trénera
    // GET metódy
    Route::get('/trainer/dashboard', [TrainerDashboardController::class, 'index']); // Získanie dát pre dashboard trénera
});

