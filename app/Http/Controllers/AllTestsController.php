<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AllTestsController extends Controller
{
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
