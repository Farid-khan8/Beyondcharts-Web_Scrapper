<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::prefix('api')->group(function () {
//     Route::get('/articles', [ArticleController::class, 'index']);
//     Route::post('/articles', [ArticleController::class, 'store']);
//     Route::get('/articles/{id}', [ArticleController::class, 'show']);
//     Route::get('/articles-latest', [ArticleController::class, 'latest']);
// });
