<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // إضافة بيانات افتراضية للجدول
        DB::table('orders')->insert([
            [
                'name' => 'Order 1',
                'user_id' => 1,  // تأكد من أن هذا المستخدم موجود في جدول users
                'address' => '123 Main St, City, Country',
                'payment_id' => Str::random(10),
                'total_price' => 100.50,
                'status' => 'pending',
                'address_lat_lng' => DB::raw("ST_GeomFromText('POINT(40.7128 -74.0060)')"), // إحداثيات الموقع
                'created_at' => Carbon::now(),
            ],
            [
                'name' => 'Order 2',
                'user_id' => 2,  // تأكد من أن هذا المستخدم موجود في جدول users
                'address' => '456 Another St, City, Country',
                'payment_id' => Str::random(10),
                'total_price' => 150.75,
                'status' => 'completed',
                'address_lat_lng' => DB::raw("ST_GeomFromText('POINT(34.0522 -118.2437)')"),
                'created_at' => Carbon::now(),
            ],
        ]);
    }
}
