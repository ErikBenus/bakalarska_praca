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
        Schema::table('value_limb', function (Blueprint $table) {
            $table->dropForeign(['test_id']);
        });

        Schema::table('value_limb', function (Blueprint $table) {
            $table->foreignId('test_id')->nullable()->change()->constrained('tests')->onDelete('cascade');
            $table->foreignId('y_balance_test_id')->nullable()->constrained('y_balance_test')->onDelete('cascade');
            $table->foreignId('max_power_test_id')->nullable()->constrained('max_power_test')->onDelete('cascade');
        });

        Schema::create('limb_lengths', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('limb_id')->constrained('testing_limb')->onDelete('cascade');
            $table->decimal('length', 6, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('value_limb', function (Blueprint $table) {
            $table->dropForeign(['test_id']);
            $table->dropForeign(['y_balance_test_id']);
            $table->dropForeign(['max_power_test_id']);

            $table->dropColumn(['y_balance_test_id', 'max_power_test_id']);

            $table->foreignId('test_id')->change()->constrained('tests')->onDelete('cascade');
        });

        Schema::dropIfExists('limb_lengths');
    }
};
