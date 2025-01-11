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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->text('address');
            $table->string('payment_id');
            $table->decimal('total_price', 10, 2); // لإدخال قيم المال مثل 100.50
            $table->enum('status', ['pending', 'completed', 'cancelled']); // حالة الطلب
            $table->timestamp('created_at')->useCurrent();
            $table->geometry('address_lat_lng');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
