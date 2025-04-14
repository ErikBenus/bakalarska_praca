<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\TestingLimb;
use App\Models\ValueLimb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreateNewTestController extends Controller
{
    private $categorySlugs = [
        'Aeróbna kapacita' => 'aerobna-kapacita',
        'Rychlostné schopnosti' => 'rychlostne-schopnosti',
        'Svalová vytrvalosť' => 'svalova-vytrvalost',
        'Vybušná sila' => 'vybusna-sila',
        'Skokový profil' => 'skokovy-profil',
        'Mobilita a flexibilita' => 'mobilita-a-flexibilita',
        'Nedefinová kategória' => 'specialne-testy',
    ];

    public function index(Request $request, $categorySlug)
    {
        $clientId = $request->query('client_id');
        $category = array_search($categorySlug, $this->categorySlugs);

        if ($category === false) {
            return response()->json(['error' => 'Neplatná kategória testu'], 400);
        }

        try {
            $latestDate = Test::where('client_id', $clientId)
                ->where('category', $category)
                ->max('created_at');

            if (!$latestDate) {
                return response()->json([], 200);
            }

            $tests = Test::where('client_id', $clientId)
                ->where('category', $category)
                ->whereDate('created_at', '=', date('Y-m-d', strtotime($latestDate)))
                ->get();

            return response()->json($tests);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function show(Request $request, $categorySlug, $testId)
    {
        $clientId = $request->query('client_id');
        $category = array_search($categorySlug, $this->categorySlugs);

        if ($category === false) {
            return response()->json(['error' => 'Neplatná kategória testu'], 400);
        }

        $values = ValueLimb::where('test_id', $testId)
            ->whereHas('test', function ($query) use ($clientId, $category) {
                $query->where('client_id', $clientId)
                    ->where('category', $category);
            })
            ->with('limb')
            ->get();

        return response()->json($values->map(function ($value) {
            $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
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
            'metrics' => 'required|string|max:255',
            'description' => 'nullable|string',
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

