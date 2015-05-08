<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('data/read','DataController@Popularity');
Route::get('data','DataController@index');
Route::get('data/marketShare','DataController@marketSharebyMake');

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::resource('Classified','\app\Models\Classified');

Route::get('data/updateModelByMake','DataController@updateModelByMake');

Route::get('data/makeComparison','DataController@makeComparison');
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
