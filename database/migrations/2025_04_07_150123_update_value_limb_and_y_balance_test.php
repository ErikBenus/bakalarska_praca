<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('value_limb', function (Blueprint $table) {
            $table->decimal('value', 10, 2)->change();
            $table->decimal('avg_value', 10, 2)->nullable()->change();
            $table->decimal('weight', 10, 2)->nullable()->change();
        });

        Schema::table('y_balance_test', function (Blueprint $table) {
            $table->decimal('absolute_value', 10, 2)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('value_limb', function (Blueprint $table) {
            $table->integer('value')->change();
            $table->integer('avg_value')->nullable()->change();
            $table->integer('weight')->nullable()->change();
        });

        Schema::table('y_balance_test', function (Blueprint $table) {
            $table->integer('absolute_value')->nullable()->change();
        });
    }
};
