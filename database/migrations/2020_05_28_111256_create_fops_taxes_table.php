<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFopsTaxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fops_taxes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('fop_id');
            $table->unsignedBigInteger('fop_income_id');
            $table->unsignedBigInteger('tax_id');
            $table->decimal('total', 9,2);
            $table->dateTime('date');
            $table->timestamps();

            $table->foreign('fop_id')->references('id')->on('fops')->onDelete('cascade');
            $table->foreign('fop_income_id')->references('id')->on('fops_incomes')->onDelete('cascade');
            $table->foreign('tax_id')->references('id')->on('taxes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fops_taxes');
    }
}
