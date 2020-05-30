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
Route::group(['namespace' => 'Api'], function () {
    Route::get('/roles', 'RoleController@index');

    Route::group(['namespace' => 'Auth'], function () {
        Route::post('register', 'RegisterController');
        Route::post('login', 'LoginController');

        Route::group(['middleware' => ['auth:api']], function() {
            Route::post('refresh', 'RefreshController');
            Route::get('/me', 'AuthController@me');
            Route::post('password/email', 'ResetPasswordController@getToken');
            Route::post('password/reset', 'ResetPasswordController@reset');
            Route::post('logout', 'LogoutController');
        });
    });

    Route::group(['middleware' => ['auth:api']], function() {

        Route::group(['prefix' => 'user'], function() {
            Route::get('/', 'UserController@index');
            Route::get('/{user}', 'UserController@show');
            Route::post('/', 'UserController@store');
            Route::put('/{user}', 'UserController@update');
            Route::delete('/{user}', 'UserController@delete');
            Route::delete('/', 'UserController@deleteMany');
        });

        Route::group(['prefix' => '/fop'], function () {
            Route::get('/', 'FopController@index');
            Route::post('/', 'FopController@store');
            Route::get('/{fop}', 'FopController@show');
            Route::put('/{fop}', 'FopController@update');
            Route::delete('/{fop}', 'FopController@delete');
            Route::post('/{fop}/income', 'FopController@addIncome');

        });

        Route::group(['prefix' => '/tax'], function () {
            Route::get('/', 'TaxController@index');
            Route::post('/', 'TaxController@store');
            Route::get('/{tax}', 'TaxController@show');
            Route::put('/{tax}', 'TaxController@update');
            Route::delete('/{tax}', 'TaxController@delete');

        });

    });

});
