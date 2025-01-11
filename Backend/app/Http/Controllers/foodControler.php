<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Food;
use Illuminate\Http\JsonResponse;
class foodControler extends Controller
{
    //
    public function getAll(): JsonResponse
    {
        $foods = Food::all();
        return response()->json($foods, 200);
    }
    public function getSearch($searchTerm): JsonResponse
    {
        if (!$searchTerm) {
            return response()->json([
                'error' => 'Search term is required.'
            ], 400);
        }

        $foods = Food::where('name', 'LIKE', "%$searchTerm%")->get();

        if ($foods->isEmpty()) {
            return response()->json([
                'message' => 'No foods found matching your search term.'
            ], 404);
        }

        return response()->json($foods, 200);
    }
    public function getById($id): JsonResponse
{
    $food = Food::find($id);
    if (!$food) {
        return response()->json([
            'message' => 'Food not found.'
        ], 404);
    }

    return response()->json($food, 200);
}
}
