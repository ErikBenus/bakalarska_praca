<?php

use App\Http\Controllers\AllTestsController;
use App\Http\Controllers\ConclusionController;
use App\Http\Controllers\ManageClientsController;
use App\Http\Controllers\ManageTrainersController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Všetky testy zobrazenie stránok (All Tests)
    Route::get('/all-tests', [AllTestsController::class, 'index'])->name('all-tests.index'); // Zobrazenie stránky so všetkými testami (tlačidlá)
    Route::get('/all-tests-y-balance-test', [AllTestsController::class, 'yBalanceTest'])->name('all-tests.y-balance-test'); // Zobrazenie stránky o Y-Balance Testovaní
    Route::get('/all-tests-maximal-strength', [AllTestsController::class, 'maximalStrength'])->name('all-tests.maximal-strength'); // Zobrazenie stránky o testovaní maximálnej sily
    Route::get('/all-tests-speed-abilities', [AllTestsController::class, 'speedAbilities'])->name('all-tests.speed-abilities'); // Zobrazenie stránky o testoch rýchlostných schopností
    Route::get('/all-tests-aerobic-capacity', [AllTestsController::class, 'aerobicCapacity'])->name('all-tests.aerobic-capacity'); // Zobrazenie stránky o testoch aeróbnej kapacity
    Route::get('/all-tests-muscle-endurance', [AllTestsController::class, 'muscleEndurance'])->name('all-tests.muscle-endurance'); // Zobrazenie stránky o svalovej vytrvalosti
    Route::get('/all-tests-explosive-power', [AllTestsController::class, 'explosivePower'])->name('all-tests.explosive-power'); // Zobrazenie stránky so výbušnej sile
    Route::get('/all-tests-jump-profile', [AllTestsController::class, 'jumpProfile'])->name('all-tests.jump-profile'); // Zobrazenie stránky o skoskovom profile
    Route::get('/all-tests-mobility-flexibility', [AllTestsController::class, 'mobilityFlexibility'])->name('all-tests.mobility-flexibility'); // Zobrazenie stránky o testoch mobility a flexibility
    Route::get('/all-tests-easy-force', [AllTestsController::class, 'easyForce'])->name('all-tests.easy-force'); // Zobrazenie stránky o Easy Force

    // Profily (Profiles)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit'); // Zobrazenie formulára pre úpravu profilu
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update'); // Spracovanie aktualizácie profilu
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy'); // Spracovanie odstránenia profilu

    // Klienti (Clients)
    Route::get('/all-clients', [ManageClientsController::class, 'index'])->name('clients.index'); // Zobrazenie stránky so všetkými klientmi
    Route::get('/clients/{clientId}', [ManageClientsController::class, 'show']); // Zobrazenie detailu klienta

    // Tréneri (Trainers)
    Route::get('/all-trainers', [ManageTrainersController::class, 'index'])->name('trainers.index'); // Zobrazenie stránky so všetkými trénermi

    // Oprávnenia používateľa (User Permissions)
    Route::get('/user-permissions', function (Request $request) { // Získanie rolí a povolení prihláseného používateľa (API endpoint pre frontend)
        return response()->json([
            'roles' => $request->user()->roles->pluck('name'),
            'permissions' => $request->user()->getAllPermissions()->pluck('name'),
        ]);
    });

    // História testov a závery (History & Conclusions)
    Route::get('/history-of-all-tests', [AllTestsController::class, 'showAllTestsPage'])->name('history.all.tests'); // Zobrazenie stránky s históriou všetkých testov
    Route::get('/clients/{clientId}/conclusions', [ConclusionController::class, 'clientView'])->name('conclusions.client.view'); // Zobrazenie záverov pre konkrétneho klienta
});


require __DIR__ . '/api.php';
require __DIR__ . '/auth.php';
