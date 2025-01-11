<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function createOrder(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id', // التحقق من أن المستخدم موجود
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'payment_id' => 'required|string',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|in:pending,completed,cancelled',
            'address_lat_lng' => 'required|string', // يجب أن تكون في تنسيق POINT(x y)
        ]);

        $order = Order::create([
            'user_id' => $validatedData['user_id'],
            'name' => $validatedData['name'],
            'address' => $validatedData['address'],
            'payment_id' => $validatedData['payment_id'],
            'total_price' => $validatedData['total_price'],
            'status' => $validatedData['status'],
            'address_lat_lng' => DB::raw("ST_GeomFromText('{$validatedData['address_lat_lng']}')"),
        ]);

        return response()->json([
            'message' => 'Order created successfully.',
            'order' => $order,
        ], 201);
    }
    public function getOrderStatus($orderId): JsonResponse
    {
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json([
                'message' => 'Order not found.',
            ], 404);
        }

        return response()->json([
            'order_id' => $order->id,
            'status' => $order->status,
        ], 200);
    }
    public function getOrdersByUser($userId): JsonResponse
    {
        try {
            $orders = Order::where('user_id', $userId)->get();

            if ($orders->isEmpty()) {
                return response()->json([
                    'message' => 'No orders found for this user.',
                ], 404);
            }

            return response()->json($orders, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
