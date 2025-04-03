<?php

namespace App\Http\Controllers\Tests;

use App\Http\Controllers\Controller;
use App\Models\Test;
use App\Models\ValueLimb;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $values = ValueLimb::where('test_id', $testId)->get();

        return response()->json($values);
    }
}
