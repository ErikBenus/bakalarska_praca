<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\LimbLength;
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

        if (!$clientId) {
            return response()->json(['error' => 'Client ID is required'], 400);
        }

        try {
            $latestDate = YBalanceTest::where('client_id', $clientId)
                ->max('created_at');

            if (!$latestDate) {
                return response()->json([], 200);
            }

            $yBalanceTests = YBalanceTest::where('client_id', $clientId)
                ->whereDate('created_at', '=', date('Y-m-d', strtotime($latestDate)))
                ->get();

            return response()->json($yBalanceTests, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function show($id, Request $request)
    {
        $clientId = $request->query('client_id');

        if (!$clientId) {
            return response()->json(['error' => 'Client ID is required'], 400);
        }

        try {
            $yBalanceTest = YBalanceTest::where('id', $id)->where('client_id', $clientId)->firstOrFail();

            $valueLimbs = ValueLimb::where('y_balance_test_id', $yBalanceTest->id)->get();

            // Získajte dátum vytvorenia testu
            $testDate = $yBalanceTest->created_at->toDateString();

            // Vyhľadajte dĺžky končatín s rovnakým dátumom
            $limbLengths = LimbLength::where('client_id', $clientId)
                ->whereDate('updated_at', '=', $testDate)
                ->get()
                ->keyBy('limb_id');

            $valuesWithLimbNames = $valueLimbs->map(function ($value) use ($limbLengths) {
                $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
                $limbLength = $limbLengths[$value->id_limb]->length ?? 0;
                return [
                    'id' => $value->id,
                    'y_balance_test_id' => $value->y_balance_test_id,
                    'id_limb' => $value->id_limb,
                    'limb_name' => $limbName,
                    'value' => $value->value,
                    'attempt' => $value->attempt,
                    'avg_value' => $value->avg_value,
                    'weight' => $value->weight,
                    'limb_length' => $limbLength,
                    'created_at' => $value->created_at,
                    'updated_at' => $value->updated_at,
                ];
            });

            $rightLegValues = $valuesWithLimbNames->where('limb_name', 'Pravá noha')->pluck('value')->toArray();
            $leftLegValues = $valuesWithLimbNames->where('limb_name', 'Ľavá noha')->pluck('value')->toArray();

            $rightLegAvg = count($rightLegValues) > 0 ? array_sum($rightLegValues) / count($rightLegValues) : 0;
            $leftLegAvg = count($leftLegValues) > 0 ? array_sum($leftLegValues) / count($leftLegValues) : 0;

            $absoluteDistanceRight = round($rightLegAvg, 2);
            $absoluteDistanceLeft = round($leftLegAvg, 2);

            $absoluteDifference = round(abs($absoluteDistanceRight - $absoluteDistanceLeft), 2);

            $rightLegLength = $limbLengths[3]->length ?? 1;
            $leftLegLength = $limbLengths[4]->length ?? 1;

            $relativeDistanceRight = round(($rightLegAvg / $rightLegLength) * 100, 2);
            $relativeDistanceLeft = round(($leftLegAvg / $leftLegLength) * 100, 2);

            $relativeDistance = round(max($relativeDistanceRight, $relativeDistanceLeft), 2);
            $relativeDifference = round(abs($relativeDistanceRight - $relativeDistanceLeft), 2);

            return response()->json([
                'test' => $yBalanceTest,
                'values' => $valuesWithLimbNames,
                'absoluteDistanceRight' => $absoluteDistanceRight,
                'absoluteDistanceLeft' => $absoluteDistanceLeft,
                'absoluteDifference' => $absoluteDifference,
                'relativeDistance' => $relativeDistance,
                'relativeDifference' => $relativeDifference,
                'relativeDistanceRight' => $relativeDistanceRight,
                'relativeDistanceLeft' => $relativeDistanceLeft,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Test not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error'], 500);
        }
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

            // Oprava stĺpca na y_balance_test_id
            $rightLegValues = ValueLimb::where('y_balance_test_id', $yBalanceTest->id)
                ->where('id_limb', 3) // Pravá noha
                ->pluck('value')
                ->toArray();

            $leftLegValues = ValueLimb::where('y_balance_test_id', $yBalanceTest->id)
                ->where('id_limb', 4) // Ľavá noha
                ->pluck('value')
                ->toArray();

            $rightLegAverage = count($rightLegValues) > 0 ? array_sum($rightLegValues) / count($rightLegValues) : 0;
            $leftLegAverage = count($leftLegValues) > 0 ? array_sum($leftLegValues) / count($leftLegValues) : 0;

            $absoluteValue = round(abs($rightLegAverage - $leftLegAverage), 2);

            YBalanceTest::where('id', $yBalanceTest->id)->update(['absolute_value' => $absoluteValue]);

            DB::commit();

            return response()->json(['message' => 'Y Balance Test vytvorený úspešne', 'test' => $yBalanceTest]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json(['error' => 'Chyba validácie', 'messages' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function getCompositeDistance(Request $request)
    {
        $clientId = $request->input('client_id');

        $latestDate = YBalanceTest::where('client_id', $clientId)->max('created_at');

        $tests = YBalanceTest::where('client_id', $clientId)
            ->where('created_at', $latestDate)
            ->whereIn('name', ['Anterior', 'Posterolateral', 'Posteromedial'])
            ->get();

        if ($tests->count() !== 3) {
            return response()->json(['error' => 'Nedostatok dát pre výpočet.'], 400);
        }

        $allRightValues = [];
        $allLeftValues = [];

        foreach ($tests as $test) {
            $valueLimbs = ValueLimb::where('y_balance_test_id', $test->id)->get();

            $testDate = $test->created_at->toDateString();

            $limbLengths = LimbLength::where('client_id', $clientId)
                ->whereDate('updated_at', '=', $testDate)
                ->get()
                ->keyBy('limb_id');

            $valuesWithLimbNames = $valueLimbs->map(function ($value) use ($limbLengths) {
                $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
                $limbLength = $limbLengths[$value->id_limb]->length ?? 0;
                return [
                    'id' => $value->id,
                    'y_balance_test_id' => $value->y_balance_test_id,
                    'id_limb' => $value->id_limb,
                    'limb_name' => $limbName,
                    'value' => $value->value,
                    'attempt' => $value->attempt,
                    'avg_value' => $value->avg_value,
                    'weight' => $value->weight,
                    'limb_length' => $limbLength,
                    'created_at' => $value->created_at,
                    'updated_at' => $value->updated_at,
                ];
            });

            $rightLegValues = $valuesWithLimbNames->where('limb_name', 'Pravá noha')->pluck('value')->toArray();
            $leftLegValues = $valuesWithLimbNames->where('limb_name', 'Ľavá noha')->pluck('value')->toArray();

            $allRightValues = array_merge($allRightValues, $rightLegValues);
            $allLeftValues = array_merge($allLeftValues, $leftLegValues);
        }

        if (count($allRightValues) === 0 || count($allLeftValues) === 0) {
            return response()->json(['error' => 'Nedostatok dát pre výpočet.'], 400);
        }

        $rightAverage = array_sum($allRightValues) / 9;
        $leftAverage = array_sum($allLeftValues) / 9;

        $rightLegLength = $limbLengths[3]->length ?? 1;
        $leftLegLength = $limbLengths[4]->length ?? 1;

        return response()->json([
            'right' => round(($rightAverage / $rightLegLength) * 100, 2),
            'left' => round(($leftAverage / $leftLegLength) * 100, 2)
        ]);
    }

}
