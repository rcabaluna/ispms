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
        Schema::create('tbluom', function (Blueprint $table) {
            $table->bigIncrements('uomid'); // Primary key
            $table->string('name'); // Column for unit name
            $table->string('abbreviation'); // Column for unit abbreviation
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbluom');
    }
};
