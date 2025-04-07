<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\Test;
use App\Models\TestingLimb;
use App\Models\ValueLimb;
use App\Models\YBalanceTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class YBalanceTestController extends Controller
{
    public function index(Request $request)
    {
        $clientId = $request->query('client_id');

        try {
            $tests = Test::where('category', 'Y Balance Test')
                ->where('client_id', $clientId)
                ->get();

            return response()->json($tests);
        } catch (\Exception $e) {
            \Log::error('Chyba v YBalanceTestController@index: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function show($testId, Request $request)
    {
        $clientId = $request->query('client_id');

        $values = ValueLimb::where('test_id', $testId)
            ->whereHas('test', function ($query) use ($clientId) {
                $query->where('client_id', $clientId);
            })
            ->with('limb')
            ->get();

        return response()->json($values->map(function ($value) {
            $limbName = TestingLimb::where('id', $value->id_limb)->value('name');
            return [
                'id' => $value->id,
                'test_id' => $value->test_id,
                'id_limb' => $value->id_limb,
                'limb_name' => $limbName,
                'value' => $value->value,
                'attempt' => $value->attempt,
                'avg_value' => $value->avg_value,
                'weight' => $value->weight,
                'created_at' => $value->created_at,
                'updated_at' => $value->updated_at,
            ];
        }));
    }

    public function store(Request $request)
    {
        // Validácia vstupov
        $validated = $request->validate([
            'client_id' => 'required|exists:users,id',
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            $yBalanceTest = YBalanceTest::create([
                'client_id' => $validated['client_id'],
                'name' => $validated['name'],
                'absolute_value' => 0,
                'updated_at' => now(),
            ]);

            if ($request->has('values') && is_array($request->values)) {
                foreach ($request->values as $value) {
                    if (!empty($value['id_limb']) && isset($value['value'])) {
                        ValueLimb::create([
                            'y_balance_test_id' => $yBalanceTest->id,
                            'id_limb' => $value['id_limb'],
                            'value' => $value['value'],
                            'attempt' => $value['attempt'],
                            'weight' => $value['weight'] ?? null,
                        ]);
                    }
                }
            }

//            $rightLegValues = ValueLimb::where('test_id', $yBalanceTest->id)
//                ->where('id_limb', 3) // Pravá noha
//                ->pluck('value')
//                ->toArray();
//
//            $leftLegValues = ValueLimb::where('test_id', $yBalanceTest->id)
//                ->where('id_limb', 4) // Ľavá noha
//                ->pluck('value')
//                ->toArray();
//
//            $rightLegAverage = count($rightLegValues) > 0 ? array_sum($rightLegValues) / count($rightLegValues) : 0;
//            $leftLegAverage = count($leftLegValues) > 0 ? array_sum($leftLegValues) / count($leftLegValues) : 0;
//
//            $absoluteValue = abs($rightLegAverage - $leftLegAverage);
//
//            // Aktualizácia absolute_value v YBalanceTest
//            YBalanceTest::where('id', $yBalanceTest->id)->update(['absolute_value' => $absoluteValue]);

            DB::commit();

            return response()->json(['message' => 'Y Balance Test vytvorený úspešne', 'test' => $yBalanceTest]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            \Log::error('Chyba validácie YBalanceTestController@store: ' . $e->getMessage());
            return response()->json(['error' => 'Chyba validácie', 'messages' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Chyba YBalanceTestController@store: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }


    // Aktualizácia existujúceho Y Balance testu
//    public function update($testId, Request $request)
//    {
//        $validator = Validator::make($request->all(), [
//            'name' => 'required|string',
//            'description' => 'nullable|string',
//            'values' => 'required|array',
//        ]);
//
//        if ($validator->fails()) {
//            return response()->json(['errors' => $validator->errors()], 422);
//        }
//
//        try {
//            // Získanie testu podľa ID
//            $test = Test::findOrFail($testId);
//
//            // Aktualizovanie testu
//            $test->name = $request->input('name');
//            $test->description = $request->input('description');
//            $test->updated_at = now();
//            $test->save();
//
//            // Aktualizovanie hodnôt v tabuľke ValueLimb
//            foreach ($request->input('values') as $value) {
//                ValueLimb::updateOrCreate(
//                    ['test_id' => $test->id, 'id_limb' => $value['id_limb'], 'attempt' => $value['attempt']],
//                    [
//                        'value' => $value['value'],
//                        'weight' => $value['weight'] ?? null,
//                        'avg_value' => $value['avg_value'] ?? null,
//                        'updated_at' => now(),
//                    ]
//                );
//            }
//
//            return response()->json(['message' => 'Y Balance Test aktualizovaný úspešne', 'test' => $test]);
//        } catch (\Exception $e) {
//            \Log::error('Chyba v YBalanceTestController@update: ' . $e->getMessage());
//            return response()->json(['error' => 'Server error'], 500);
//        }
//    }
}
