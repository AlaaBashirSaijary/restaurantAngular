<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DatabaseCheckController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResetPasswordControler;
use App\Http\Controllers\ChangePasswordControler;
use App\Http\Controllers\foodControler;
use App\Http\Controllers\tagControler;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;

Route::get('/check-database', [DatabaseCheckController::class, 'checkConnection']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/sendPassword', [ResetPasswordControler::class, 'sendEmail']);
Route::post('/resetPassword', [ChangePasswordControler::class, 'resetPassword']);
Route::get('/foods', [foodControler::class,'getAll']);
Route::get('/tags', [tagControler::class,'getAllTags']);
Route::get('/foods/search/{searchTerm}', [foodControler::class,'getSearch']);
Route::get('/foods/{id}', [foodControler::class, 'getById']);
Route::get('/tag/{name}', [tagControler::class, 'getTagByName']);
Route::post('/orders', [OrderController::class, 'createOrder']); // إنشاء طلب جديد
Route::get('/orders/{orderId}/status', [OrderController::class, 'getOrderStatus']); // حالة الطلب
Route::get('/users/{userId}/orders', [OrderController::class, 'getOrdersByUser']);
Route::get('/orders/{orderId}', [OrderController::class, 'getOrderDetails']);
Route::get('/user/{id}', [UserController::class, 'getUserById']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/cart/add/{foodId}', [CartController::class, 'addToCart']);
    Route::get('/cart', [CartController::class, 'getCart']);
});
Route::group([
    'middleware' => 'api',
], function ($router) {

    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});
