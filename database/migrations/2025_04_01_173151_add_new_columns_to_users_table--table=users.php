<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_number')->nullable();
            $table->renameColumn('name', 'first_name');
            $table->date('birth_date')->nullable();
            $table->string('gender')->nullable();
            $table->string('dominant_hand')->nullable();
          });

        Schema::table('users', function (Blueprint $table) {
            $table->string('last_name')->after('first_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone_number');
            $table->renameColumn('first_name', 'name');
            $table->dropColumn('last_name');
            $table->dropColumn('birth_date');
            $table->dropColumn('gender');
            $table->dropColumn('dominant_hand');
        });
    }
};
