<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TestingLimbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear the table before seeding
        DB::table('testing_limb')->delete();

        // Seed the table with data from the image
        DB::table('testing_limb')->insert([
            [
                'id' => 1,
                'name' => 'Pravá ruka',
                'created_at' => Carbon::parse('2025-04-02 22:44:59'),
                'updated_at' => Carbon::parse('2025-04-02 22:45:02'),
            ],
            [
                'id' => 2,
                'name' => 'Ľavá ruka',
                'created_at' => Carbon::parse('2025-04-02 22:45:15'),
                'updated_at' => Carbon::parse('2025-04-02 22:45:17'),
            ],
            [
                'id' => 3,
                'name' => 'Pravá noha',
                'created_at' => Carbon::parse('2025-04-03 20:18:14'),
                'updated_at' => Carbon::parse('2025-04-03 20:18:15'),
            ],
            [
                'id' => 4,
                'name' => 'Ľavá noha',
                'created_at' => Carbon::parse('2025-04-03 20:18:22'),
                'updated_at' => Carbon::parse('2025-04-03 20:18:24'),
            ],
            [
                'id' => 5,
                'name' => '-',
                'created_at' => Carbon::parse('2025-04-06 13:18:44'),
                'updated_at' => Carbon::parse('2025-04-06 13:18:45'),
            ],
        ]);
    }
}
