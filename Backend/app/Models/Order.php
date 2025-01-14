<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';

    protected $fillable = [
    'user_id',
    'name',
    'address',
    'payment_id',
    'total_price',
    'status',
    'address_lat_lng',
];
public function user()
{
    return $this->belongsTo(User::class);
}
public function getAddressLatLngAttribute($value)
{
    if ($value) {
        try {
            // تحويل القيمة إلى WKT باستخدام ST_AsText
            $wkt = DB::selectOne("SELECT ST_AsText(ST_GeomFromWKB(?)) AS point", [$value]);
            if ($wkt && isset($wkt->point)) {
                // استخراج الإحداثيات
                $coordinates = explode(' ', str_replace(['POINT(', ')'], '', $wkt->point));
                if (count($coordinates) === 2) {
                    return [
                        'lat' => (float) $coordinates[1],
                        'lng' => (float) $coordinates[0],
                    ];
                } } 
            } catch (\Exception $e) { } }

    return null; // إذا لم تكن القيمة صالحة
}

public function setAddressLatLngAttribute($value)
{
    if (is_array($value) && isset($value['lat'], $value['lng'])) {
        $this->attributes['address_lat_lng'] = DB::raw("ST_GeomFromText('POINT({$value['lng']} {$value['lat']})')");
    }
}
}
