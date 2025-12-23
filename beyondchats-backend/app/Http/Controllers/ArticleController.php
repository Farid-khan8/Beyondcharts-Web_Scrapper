<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::latest()->get();
    }

    public function store(Request $request)
    {
        return Article::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'content' => $request->content,
            'is_updated' => $request->is_updated ?? false,
            'references' => $request->references
        ]);
    }

    public function show($id)
    {
        return Article::findOrFail($id);
    }

    public function latest()
    {
        return Article::latest()->first();
    }
}
