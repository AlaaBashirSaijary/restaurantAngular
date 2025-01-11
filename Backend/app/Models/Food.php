<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;
    protected $table = 'foods';
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
    protected $fillable = [
        'name',
        'price',
        'tags',
        'favorite',
        'stars',
        'image_url',
        'origins',
        'cook_time',
    ];

    protected $casts = [
        'tags' => 'array',
        'origins' => 'array',
    ];
}
