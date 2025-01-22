<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB; // إضافة هذا السطر لاستيراد واجهة DB

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/websocket-test', function () {
    return view('websocket');
});
Route::get('/', function () {
    return view('welcome');
});
Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return 'Database connection is working!';
    } catch (\Exception $e) {
        return 'Database connection failed: ' . $e->getMessage();
    }
});
