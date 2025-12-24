<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Article::truncate();

        Article::create([
            'title' => 'AI in Healthcare: Hype or Reality?',
            'slug' => 'ai-in-healthcare-hype-or-reality',
            'content' => 'This article is seeded in production to demonstrate the complete data flow.',
            'is_updated' => false,
        ]);

        Article::create([
            'title' => 'What If AI Recommends the Wrong Medicine?',
            'slug' => 'ai-wrong-medicine',
            'content' => 'This is another seeded article for demo purposes.',
            'is_updated' => true,
        ]);
    }
}
