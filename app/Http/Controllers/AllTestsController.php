<?php

namespace App\Http\Controllers;

use App\Models\MaxPowerTest;
use App\Models\Test;
use App\Models\TestingLimb;
use App\Models\User;
use App\Models\ValueLimb;
use App\Models\YBalanceTest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AllTestsController extends Controller
{
    private $categorySlugs = [
        'Aeróbna kapacita' => 'aerobna-kapacita',
        'Rychlostné schopnosti' => 'rychlostne-schopnosti',
        'Svalová vytrvalosť' => 'svalova-vytrvalost',
        'Vybušná sila' => 'vybusna-sila',
        'Skokový profil' => 'skokovy-profil',
        'Mobilita a flexibilita' => 'mobilita-a-flexibilita',
        'Nedefinová kategória' => 'specialne-testy',
        'Easy force' => 'easy-force',
    ];

    public function showHistory(Request $request, $clientId)
    {
        try {
            $allTests = [];

            $maxPowerTests = MaxPowerTest::where('client_id', $clientId)->get();
            foreach ($maxPowerTests as $maxPowerTest) {
                $valueLimbs = ValueLimb::where('max_power_test_id', $maxPowerTest->id)->get();
                $valuesWithLimbNames = $valueLimbs->map(function ($value) {
                    $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
                    return array_merge($value->toArray(), ['limb_name' => $limbName]);
                });
                $allTests[] = [
                    'test_type' => 'max_power_test',
                    'test' => $maxPowerTest,
                    'values' => $valuesWithLimbNames,
                ];
            }

            $yBalanceTests = YBalanceTest::where('client_id', $clientId)->get();
            foreach ($yBalanceTests as $yBalanceTest) {
                $valueLimbs = ValueLimb::where('y_balance_test_id', $yBalanceTest->id)->get();
                $valuesWithLimbNames = $valueLimbs->map(function ($value) {
                    $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
                    return array_merge($value->toArray(), ['limb_name' => $limbName]);
                });
                $allTests[] = [
                    'test_type' => 'y_balance_test',
                    'test' => $yBalanceTest,
                    'values' => $valuesWithLimbNames,
                ];
            }

            foreach ($this->categorySlugs as $category => $slug) {
                $tests = Test::where('client_id', $clientId)
                    ->where('category', $category)
                    ->get();

                foreach ($tests as $test) {
                    $valueLimbs = ValueLimb::where('test_id', $test->id)->get();
                    $valuesWithLimbNames = $valueLimbs->map(function ($value) {
                        $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
                        return array_merge($value->toArray(), ['limb_name' => $limbName]);
                    });
                    $allTests[] = [
                        'test_type' => 'test',
                        'test' => $test,
                        'values' => $valuesWithLimbNames,
                    ];
                }
            }

            return response()->json($allTests, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function showAllClientsTests(Request $request)
    {
        try {
            $allTests = [];
            $clientRole = Role::where('name', 'client')->first();

            if ($clientRole) {
                $clients = User::role($clientRole->name)->get();

                foreach ($clients as $client) {
                    // Načítanie MaxPowerTests a ich ValueLimbs
                    $maxPowerTests = MaxPowerTest::where('client_id', $client->id)->get();
                    foreach ($maxPowerTests as $maxPowerTest) {
                        $valueLimbs = ValueLimb::where('max_power_test_id', $maxPowerTest->id)->get();
                        $valuesWithLimbNames = $valueLimbs->map(function ($value) {
                            $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
                            return array_merge($value->toArray(), ['limb_name' => $limbName]);
                        });
                        $allTests[] = [
                            'test_type' => 'max_power_test',
                            'test' => $maxPowerTest,
                            'values' => $valuesWithLimbNames,
                            'client' => [
                                'first_name' => $client->first_name,
                                'last_name' => $client->last_name,
                            ],
                            'client_id' => $client->id,
                        ];
                    }

                    // Načítanie YBalanceTests a ich ValueLimbs
                    $yBalanceTests = YBalanceTest::where('client_id', $client->id)->get();
                    foreach ($yBalanceTests as $yBalanceTest) {
                        $valueLimbs = ValueLimb::where('y_balance_test_id', $yBalanceTest->id)->get();
                        $valuesWithLimbNames = $valueLimbs->map(function ($value) {
                            $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
                            return array_merge($value->toArray(), ['limb_name' => $limbName]);
                        });
                        $allTests[] = [
                            'test_type' => 'y_balance_test',
                            'test' => $yBalanceTest,
                            'values' => $valuesWithLimbNames,
                            'client' => [
                                'first_name' => $client->first_name,
                                'last_name' => $client->last_name,
                            ],
                            'client_id' => $client->id,
                        ];
                    }

                    foreach ($this->categorySlugs as $category => $slug) {
                        $tests = Test::where('client_id', $client->id)
                            ->where('category', $category)
                            ->get();

                        foreach ($tests as $test) {
                            $valueLimbs = ValueLimb::where('test_id', $test->id)->get();
                            $valuesWithLimbNames = $valueLimbs->map(function ($value) {
                                $limbName = TestingLimb::where('id', $value->id_limb)->value('name') ?? '-';
                                return array_merge($value->toArray(), ['limb_name' => $limbName]);
                            });
                            $allTests[] = [
                                'test_type' => 'test',
                                'test' => $test,
                                'values' => $valuesWithLimbNames,
                                'client' => [
                                    'first_name' => $client->first_name,
                                    'last_name' => $client->last_name,
                                ],
                                'client_id' => $client->id,
                            ];
                        }
                    }
                }
            }

            return response()->json($allTests, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error'], 500);
        }
    }

    public function showAllTestsPage()
    {
        return Inertia::render('Clients/HistoryOfAllTests');
    }

    public function index() {
        return Inertia::render('Tests/All', []);
    }

    public function yBalanceTest()
    {
        return Inertia::render('Tests/YBalanceTest');
    }

    public function maximalStrength()
    {
        return Inertia::render('Tests/MaximalStrength');
    }

    public function speedAbilities()
    {
        return Inertia::render('Tests/SpeedAbilities');
    }

    public function aerobicCapacity()
    {
        return Inertia::render('Tests/AerobicCapacity');
    }

    public function muscleEndurance()
    {
        return Inertia::render('Tests/MuscleEndurance');
    }

    public function explosivePower()
    {
        return Inertia::render('Tests/ExplosivePower');
    }

    public function jumpProfile()
    {
        return Inertia::render('Tests/JumpProfile');
    }

    public function mobilityFlexibility()
    {
        return Inertia::render('Tests/MobilityFlexibility');
    }

    public function easyForce()
    {
        return Inertia::render('Tests/EasyForce');
    }
}
