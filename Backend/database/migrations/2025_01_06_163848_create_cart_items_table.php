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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cart_id'); // نستخدم unsignedBigInteger بدل foreignId
            $table->unsignedBigInteger('food_id'); // نستخدم unsignedBigInteger بدل foreignId
            $table->integer('quantity')->default(1);
            $table->timestamps();

            // إضافة العلاقات مع الجداول الأخرى
            $table->foreign('cart_id')->references('id')->on('carts')->onDelete('cascade');
            $table->foreign('food_id')->references('id')->on('foods')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};

