<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblCoreTable extends Migration
{
    public function up(): void
    {
        Schema::create('tbluseraccounts', function (Blueprint $table) {
            $table->id('useraccountid');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('role', 45)->default('user');
            $table->timestamps();
        });

        Schema::create('tblstockin', function (Blueprint $table) {
            $table->increments('stockinid');
            $table->string('POnumber')->unique(); // changed from ponumber
            $table->string('fundcluster')->nullable();
            $table->timestamps();
        });

        Schema::create('tblinventory_items', function (Blueprint $table) {
            $table->increments('invitemsid');
            $table->string('POnumber', 45); // changed from ponumber
            $table->string('stock_no')->nullable();
            $table->double('quantity', 15, 2);
            $table->string('item');
            $table->double('unit_cost', 15, 2)->nullable();
            $table->string('uacs_code', 45)->nullable();
            $table->foreign('POnumber')->references('POnumber')->on('tblstockin')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::create('tbluom', function (Blueprint $table) {
            $table->id('uomid');
            $table->string('name');
            $table->string('abbreviation');
        });

        Schema::create('tblrequest_summary', function (Blueprint $table) {
            $table->increments('requestsummaryid');
            $table->string('requester', 45);
            $table->string('supervisor')->nullable();
            $table->timestamp('requestdate')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->text('purpose')->nullable();
            $table->string('xstatus', 45)->default('Pending');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });

        Schema::create('tblrequest_details', function (Blueprint $table) {
            $table->increments('requestdetailsid');
            $table->unsignedInteger('requestsummaryid')->nullable();
            $table->string('stock_no')->nullable();
            $table->double('quantity', 15, 2);
            $table->boolean('is_served')->default(0);
            $table->foreign('requestsummaryid')->references('requestsummaryid')->on('tblrequest_summary')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tblrequest_details');
        Schema::dropIfExists('tblrequest_summary');
        Schema::dropIfExists('tbluom');
        Schema::dropIfExists('tblinventory_items');
        Schema::dropIfExists('tblstockin');
        Schema::dropIfExists('tbluseraccounts');
    }
}
