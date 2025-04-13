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
    Route::get('/easy-force/all', [EasyForceController::class, 'indexAll']);
    Route::get('/easy-force/{testId}', [EasyForceController::class, 'show']);
    Route::post('/easy-force', [EasyForceController::class, 'store']);

    Route::get('/clients/{clientId}/data', [ClientsDataController::class, 'show']);

    Route::post('/tests', [CreateNewTestController::class, 'store']);
    Route::get('/tests/{categorySlug}', [CreateNewTestController::class, 'index']);
    Route::get('/tests/{categorySlug}/{testId}', [CreateNewTestController::class, 'show']);

    Route::post('/value-limb', function () {
        return response()->json([], 404);
    });

    Route::post('/y-balance-test', [YBalanceTestController::class, 'store']);
    Route::get('/y-balance-test', [YBalanceTestController::class, 'index']);
    Route::get('/y-balance-test/{id}', [YBalanceTestController::class, 'show']);
    Route::get('/composite-distance', [YBalanceTestController::class, 'getCompositeDistance']);

    Route::post('/all-trainers', [ManageTrainersController::class, 'store']);
    Route::get('/all-trainers/{id}/edit', [ManageTrainersController::class, 'edit']);
    Route::put('/all-trainers/{id}', [ManageTrainersController::class, 'update']);
    Route::delete('/all-trainers/{id}', [ManageTrainersController::class, 'destroy']);
    Route::post('/all-trainers/{id}/promote', [ManageTrainersController::class, 'promoteToAdmin']);

    Route::get('/max-power-tests', [MaxPowerTestController::class, 'index']);
    Route::get('/max-power-tests/{id}', [MaxPowerTestController::class, 'show']);
    Route::post('/max-power-tests', [MaxPowerTestController::class, 'store']);

    Route::get('/client/{clientId}/all-tests', [AllTestsController::class, 'showHistory']);
    Route::get('/trainer/all-clients-tests', [AllTestsController::class, 'showAllClientsTests']);

    Route::get('/conclusions', [ConclusionController::class, 'index']);
    Route::post('/conclusions', [ConclusionController::class, 'store']);
    Route::get('/conclusions/{id}', [ConclusionController::class, 'show']);
    Route::put('/conclusions/{id}', [ConclusionController::class, 'update']);
    Route::delete('/conclusions/{id}', [ConclusionController::class, 'destroy']);
    Route::get('/clients', [ConclusionController::class, 'clientsOnly']);

    Route::get('/trainer/dashboard', [TrainerDashboardController::class, 'index']);
});

