<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB; // إضافة هذا السطر لاستيراد واجهة DB

use Illuminate\Http\Request;

use Exception;

class DatabaseCheckController extends Controller
{
    /**
     * Check database connection.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkConnection(Request $request)
    {
        try {
            // Attempt to get the database connection
            DB::connection()->getPdo();
            $database = DB::connection()->getDatabaseName();

            // Return a success response
            return response()->json([
                'status' => 'success',
                'message' => "Connected successfully to database: $database"
            ]);
        } catch (Exception $e) {
            // Return an error response
            return response()->json([
                'status' => 'error',
                'message' => 'Database connection failed: ' . $e->getMessage()
            ], 500);
        }
    }
}
