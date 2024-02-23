<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/login', [App\Http\Controllers\AuthController::class, 'index']);
Route::post('/login', [App\Http\Controllers\AuthController::class, 'login'])->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::get('/logout', [App\Http\Controllers\AuthController::class, 'logout'])->name('logout');

    Route::middleware('is_master')->group(function () {
        Route::resource('/users', App\Http\Controllers\UserController::class);
    });

    Route::resource('/tasks', App\Http\Controllers\TaskController::class);
});