<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::prefix('admin')->group(function () {
    Route::post('/auth/login', 'AuthController@login');
    Route::get('/auth/logout', 'AuthController@logout');
    Route::resource('/product', 'ProductController');
    Route::post('/product/active/{id}', 'ProductController@active')->name('product.active');
});

Route::get('/product', 'ProductController@clientIndex');
Route::get('/product/{id}', 'ProductController@clientShow');


