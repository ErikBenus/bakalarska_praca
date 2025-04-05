<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\Test;
use App\Models\TestingLimb;
use App\Models\ValueLimb;
use Illuminate\Http\Request;
use Validator;

class YBalanceTestController extends Controller
{
    // Získanie všetkých testov pre Y Balance test pre konkrétneho klienta
    public function index(Request $request)
    {
        $clientId = $request->query('client_id'); // Načítanie clientId z query parametrov

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

    // Získanie konkrétneho testu podľa ID a jeho hodnoty
    public function show($testId, Request $request)
    {
        $clientId = $request->query('client_id'); // Načítanie clientId z query parametrov

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

    // Uloženie nového Y Balance testu
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|exists:users,id',
            'created_at' => 'required|date',
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Vytvorenie nového testu
            $test = new Test();
            $test->client_id = $request->input('client_id');
            $test->category = 'Y Balance Test';
            $test->name = $request->input('name');
            $test->description = $request->input('description');
            $test->created_at = $request->input('created_at');
            $test->updated_at = now();
            $test->save();

            // Uloženie hodnôt do tabuľky ValueLimb pre Y Balance Test
            $values = $request->input('values'); // Predpokladám, že sú odosielané hodnoty v tomto formáte

            foreach ($values as $value) {
                ValueLimb::create([
                    'test_id' => $test->id,
                    'id_limb' => $value['id_limb'],
                    'value' => $value['value'],
                    'attempt' => $value['attempt'],
                    'weight' => $value['weight'] ?? null,
                    'avg_value' => $value['avg_value'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            return response()->json(['message' => 'Y Balance Test vytvorený úspešne', 'test' => $test]);
        } catch (\Exception $e) {
            \Log::error('Chyba v YBalanceTestController@store: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    // Aktualizácia existujúceho Y Balance testu
    public function update($testId, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'nullable|string',
            'values' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // Získanie testu podľa ID
            $test = Test::findOrFail($testId);

            // Aktualizovanie testu
            $test->name = $request->input('name');
            $test->description = $request->input('description');
            $test->updated_at = now();
            $test->save();

            // Aktualizovanie hodnôt v tabuľke ValueLimb
            foreach ($request->input('values') as $value) {
                ValueLimb::updateOrCreate(
                    ['test_id' => $test->id, 'id_limb' => $value['id_limb'], 'attempt' => $value['attempt']],
                    [
                        'value' => $value['value'],
                        'weight' => $value['weight'] ?? null,
                        'avg_value' => $value['avg_value'] ?? null,
                        'updated_at' => now(),
                    ]
                );
            }

            return response()->json(['message' => 'Y Balance Test aktualizovaný úspešne', 'test' => $test]);
        } catch (\Exception $e) {
            \Log::error('Chyba v YBalanceTestController@update: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}
