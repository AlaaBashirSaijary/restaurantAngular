<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;
    protected $fillable = ['cart_id', 'food_id', 'quantity'];
    public function food()
    {
        return $this->belongsTo(Food::class);
    }

    public function getPriceAttribute()
    {
        return $this->food->price * $this->quantity;
    }
}
