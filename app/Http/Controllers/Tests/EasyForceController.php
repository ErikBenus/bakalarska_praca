<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\Test;
use App\Models\TestingLimb;
use App\Models\ValueLimb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class EasyForceController extends Controller
{

    public function index(Request $request)
    {
        $clientId = $request->query('client_id');

        try {
            $latestDate = Test::where('client_id', $clientId)
                ->where('category', 'Easy Force')
                ->max('created_at');

            if (!$latestDate) {
                return response()->json([], 200);
            }

            $tests = Test::where('client_id', $clientId)
                ->where('category', 'Easy Force')
                ->whereDate('created_at', '=', date('Y-m-d', strtotime($latestDate)))
                ->get();

            $results = [];
            foreach ($tests as $test) {
                $values = ValueLimb::where('test_id', $test->id)
                    ->whereHas('test', function ($query) use ($clientId) {
                        $query->where('client_id', $clientId);
                    })
                    ->with('limb')
                    ->get();

                $formattedValues = $values->map(function ($value) {
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
                });

                $results[] = [
                    'test' => $test,
                    'values' => $formattedValues,
                ];
            }

            return response()->json($results, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
        }
    }

    public function indexAll(Request $request)
    {
        $clientId = $request->query('client_id');

        try {
            $tests = Test::where('category', 'Easy Force')
                ->where('client_id', $clientId)
                ->get();

            return response()->json($tests);
        } catch (\Exception $e) {
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
        $validated = $request->validate([
            'client_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'metrics' => 'nullable|string|max:255',
            'description' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            $test = Test::create([
                'client_id' => $validated['client_id'],
                'name' => $validated['name'],
                'category' => $validated['category'],
                'metrics' => $validated['metrics'],
                'description' => $validated['description'] ?? null,
                'updated_at' => now(),
            ]);

            if ($request->has('values') && is_array($request->values)) {
                foreach ($request->values as $value) {
                    if (!empty($value['id_limb']) && isset($value['value'])) {
                        ValueLimb::create([
                            'test_id' => $test->id,
                            'id_limb' => $value['id_limb'],
                            'value' => $value['value'],
                            'attempt' => $value['attempt'] ?? null,
                            'weight' => $value['weight'] ?? null,
                        ]);
                    }
                }
            }

            DB::commit();

            return response()->json(['message' => 'Test vytvorený úspešne', 'id' => $test->id], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Chyba pri vytváraní testu', 'error' => $e->getMessage()], 500);
        }
    }
}
