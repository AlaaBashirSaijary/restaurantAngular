<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cart extends Model
{
    use HasFactory;
    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    public function totalPrice()
    {
        return $this->items->sum(function($item) {
            return $item->price;
        });
    }
}
