<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblinventoryItemsTable extends Migration
{
    public function up()
    {
        Schema::create('tblinventory_items', function (Blueprint $table) {
            $table->bigIncrements('invitemsid'); // Primary key
            $table->string('item');
            $table->string('stock_no')->unique();
            $table->integer('quantity');
            $table->double('unit_cost');
            $table->double('uacs_code');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tblinventory_items');
    }
}

