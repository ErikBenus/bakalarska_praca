<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\MaxPowerTest;
use App\Models\TestingLimb;
use App\Models\ValueLimb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class MaxPowerTestController extends Controller
{

    public function index(Request $request)
    {
        $clientId = $request->query('client_id');

        if (!$clientId) {
            return response()->json(['error' => 'Client ID is required'], 400);
        }

        try {
            $maxPowerTests = MaxPowerTest::where('client_id', $clientId)->get();

            return response()->json($maxPowerTests, 200);
        } catch (\Exception $e) {
            Log::error('Chyba MaxPowerTestController@index: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function show(Request $request, $id)
    {
        $clientId = $request->query('client_id');

        if (!$clientId) {
            return response()->json(['error' => 'Client ID is required'], 400);
        }

        try {
            $maxPowerTest = MaxPowerTest::where('id', $id)->where('client_id', $clientId)->firstOrFail();

            $valueLimbs = ValueLimb::where('max_power_test_id', $maxPowerTest->id)->get();

            $valuesWithLimbNames = $valueLimbs->map(function ($value) {
                $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
                return [
                    'id' => $value->id,
                    'max_power_test_id' => $value->max_power_test_id,
                    'id_limb' => $value->id_limb,
                    'limb_name' => $limbName,
                    'value' => $value->value,
                    'attempt' => $value->attempt,
                    'avg_value' => $value->avg_value,
                    'weight' => $value->weight,
                    'created_at' => $value->created_at,
                    'updated_at' => $value->updated_at,
                ];
            });

            return response()->json([
                'test' => $maxPowerTest,
                'values' => $valuesWithLimbNames,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Test not found'], 404);
        } catch (\Exception $e) {
            Log::error('Chyba MaxPowerTestController@show: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function store(Request $request)
    {
        // Validácia vstupov
        $validated = $request->validate([
            'client_id' => 'required|exists:users,id',
            'exercise_name' => 'required|string',
            'description' => 'nullable|string',
            'values' => 'required|array',
            'values.*.weight' => 'required|numeric',
            'values.*.mean_ms' => 'required|numeric',
            'values.*.average' => 'required|numeric',
            'values.*.attempt' => 'required|integer',
            'values.*.id_limb' => 'nullable|exists:testing_limb,id',
            'category' => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            $maxPowerTest = MaxPowerTest::create([
                'client_id' => $validated['client_id'],
                'exercise_name' => $validated['exercise_name'],
                'description' => $validated['description'] ?? null,
            ]);

            foreach ($validated['values'] as $value) {
                ValueLimb::create([
                    'max_power_test_id' => $maxPowerTest->id,
                    'weight' => $value['weight'],
                    'value' => $value['mean_ms'],
                    'avg_value' => $value['average'],
                    'attempt' => $value['attempt'],
                    'id_limb' => $value['id_limb']
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Max Power Test vytvorený úspešne', 'test' => $maxPowerTest], 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            Log::error('Chyba validácie MaxPowerTestController@store: ' . $e->getMessage());
            return response()->json(['error' => 'Chyba validácie', 'messages' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Chyba MaxPowerTestController@store: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}
