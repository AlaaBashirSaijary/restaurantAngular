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
        Schema::create('foods', function (Blueprint $table) {
            $table->id(); // العمود الأساسي
            $table->string('name'); // اسم المنتج
            $table->decimal('price', 8, 2); // السعر (8 أرقام، 2 بعد العلامة العشرية)
            $table->json('tags')->nullable(); // الوسوم كـ JSON
            $table->boolean('favorite')->default(false); // حالة المفضلة
            $table->unsignedTinyInteger('stars')->default(0); // عدد النجوم (0-5)
            $table->string('image_url'); // رابط الصورة
            $table->json('origins')->nullable(); // البلدان كـ JSON
            $table->string('cook_time'); // وقت الطبخ
            $table->timestamps(); // الأعمدة created_at و updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foods');
    }
};
