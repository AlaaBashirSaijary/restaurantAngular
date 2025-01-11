<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Tag;

class tagControler extends Controller
{
    //
    public function getAllTags():JsonResponse{
        $tags = Tag::all();
        return response()->json($tags, 200);
    }
    public function getTagByName(string $name): JsonResponse
    {
        // البحث عن الوسم باستخدام الاسم المدخل
        $tag = Tag::where('name', 'LIKE', "$name%")->first();

        // إذا لم يتم العثور على الوسم
        if (!$tag) {
            return response()->json([
                'message' => 'No tags found matching your query.'
            ], 404);
        }

        // البحث عن الأطعمة التي تحتوي على هذا الوسم في حقل JSON 'tags'
        $foods = Food::whereJsonContains('tags', $tag->name)->get();

        // إذا لم توجد أطعمة مرتبطة بالوسم
        if ($foods->isEmpty()) {
            return response()->json([
                'message' => 'No foods found associated with this tag.'
            ], 404);
        }

        // إرجاع الأطعمة المرتبطة بالوسم
        return response()->json($foods, 200);
    }

}
