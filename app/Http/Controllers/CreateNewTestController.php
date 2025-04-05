<?php

namespace App\Http\Controllers;

use App\Models\Test;
use App\Models\ValueLimb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CreateNewTestController extends Controller
{
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

