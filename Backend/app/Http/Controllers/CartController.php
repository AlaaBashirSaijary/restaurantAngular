<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Food;
use App\Models\CartItem;
use App\Models\Cart;

class CartController extends Controller
{
    public function addToCart(Request $request, $foodId)
    {
        $food = Food::findOrFail($foodId);
        $cart = Cart::firstOrCreate(['id' => $request->user()->cart_id]); // إنشاء أو الحصول على السلة

        // تحقق مما إذا كان الطعام موجود بالفعل في السلة
        $cartItem = $cart->items()->where('food_id', $food->id)->first();

        if ($cartItem) {
            // إذا كان الطعام موجودًا بالفعل، قم بتحديث الكمية
            $cartItem->quantity += 1;
            $cartItem->save();
        } else {
            // إذا لم يكن الطعام في السلة، أضفه
            $cart->items()->create([
                'food_id' => $food->id,
                'quantity' => 1
            ]);
        }

        return response()->json([
            'message' => 'Food added to cart.',
            'cart' => $cart
        ]);
    }

    public function getCart(Request $request)
    {
        $cart = $request->user()->cart;

        return response()->json([
            'cart' => $cart,
            'totalPrice' => $cart->totalPrice()
        ]);
    }
}
