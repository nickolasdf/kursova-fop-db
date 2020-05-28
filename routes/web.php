<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Todo move inside api after finished react success page
Route::get('/verify', 'API\UserController@VerifyEmail');

Route::get('/{react_capture?}', function () {
    return view('welcome');
})->where('react_capture', '[\/\w\.-]*');


