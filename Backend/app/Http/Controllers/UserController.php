<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // التأكد من استيراد الموديل User
use Illuminate\Http\JsonResponse; // لاستخدام JsonResponse
class UserController extends Controller
{
    public function getUserById($id): JsonResponse
    {
        // محاولة العثور على المستخدم
        $user = User::find($id);

        // إذا لم يتم العثور على المستخدم
        if (!$user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        // إذا تم العثور على المستخدم
        return response()->json([
            'user' => $user,
        ], 200);
    }
}
