<?php

use App\Http\Controllers\AllTestsController;
use App\Http\Controllers\ManageClientsController;
use App\Http\Controllers\ManageTrainersController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/all-tests', [AllTestsController::class, 'index'])->name('all-tests.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/all-tests-y-balance-test', [AllTestsController::class, 'yBalanceTest'])->name('all-tests.y-balance-test');
    Route::get('/all-tests-maximal-strength', [AllTestsController::class, 'maximalStrength'])->name('all-tests.maximal-strength');
    Route::get('/all-tests-speed-abilities', [AllTestsController::class, 'speedAbilities'])->name('all-tests.speed-abilities');
    Route::get('/all-tests-aerobic-capacity', [AllTestsController::class, 'aerobicCapacity'])->name('all-tests.aerobic-capacity');
    Route::get('/all-tests-muscle-endurance', [AllTestsController::class, 'muscleEndurance'])->name('all-tests.muscle-endurance');
    Route::get('/all-tests-explosive-power', [AllTestsController::class, 'explosivePower'])->name('all-tests.explosive-power');
    Route::get('/all-tests-jump-profile', [AllTestsController::class, 'jumpProfile'])->name('all-tests.jump-profile');
    Route::get('/all-tests-mobility-flexibility', [AllTestsController::class, 'mobilityFlexibility'])->name('all-tests.mobility-flexibility');
    Route::get('/all-tests-easy-force', [AllTestsController::class, 'easyForce'])->name('all-tests.easy-force');

    Route::get('/all-clients', [ManageClientsController::class, 'index'])->name('clients.index');
    Route::get('/all-trainers', [ManageTrainersController::class, 'index'])->name('trainers.index');

    Route::get('/user-permissions', function (Request $request) {
        return response()->json([
            'roles' => $request->user()->roles->pluck('name'),
            'permissions' => $request->user()->getAllPermissions()->pluck('name'),
        ]);
    });

    Route::get('/clients/{clientId}', [ManageClientsController::class, 'show']);

});

require __DIR__.'/api.php';
require __DIR__.'/auth.php';
