<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\MaxPowerTest;
use App\Models\ValueLimb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class MaxPowerTestController extends Controller
{
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
