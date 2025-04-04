<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\Test;
use App\Models\TestingLimb;
use App\Models\ValueLimb;
use Illuminate\Http\Request;

class EasyForceController extends Controller
{


    public function index()
    {

        try {
            $userId = auth()->user()->id;
            $tests = Test::where('category', 'Easy Force')
                ->where('client_id', $userId)
                ->get();

            return response()->json($tests);
        } catch (\Exception $e) {
            \Log::error('Chyba v EasyForceController@index: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }


    public function show($testId)
    {
        $values = ValueLimb::where('test_id', $testId)
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
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|exists:users,id',
            'created_at' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $test = new Test();
            $test->client_id = $request->input('client_id');
            $test->category = 'Easy Force';
            $test->name = $request->input('name');
            $test->description = $request->input('description');
            $test->created_at = $request->input('created_at');
            $test->updated_at = now();
            $test->save();

            return response()->json(['message' => 'Test vytvorený úspešne', 'test' => $test]);
        } catch (\Exception $e) {
            \Log::error('Chyba v EasyForceController@store: ' . $e->getMessage());
            return response()->json(['error' => 'Server error'], 500);
        }
    }
}
