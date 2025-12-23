<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Stateless routes (NO CSRF)
*/

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles-latest', [ArticleController::class, 'latest']);
Route::post('/articles', [ArticleController::class, 'store']);
Route::get('/articles/{id}', [ArticleController::class, 'show']);