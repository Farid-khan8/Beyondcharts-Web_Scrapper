<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChats extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape oldest blog articles from BeyondChats';

    public function handle()
    {
        $this->info('Starting BeyondChats scraping...');

        $client = new Client([
            'timeout' => 10,
        ]);

        // Step 1: Fetching blog listing page
        $response = $client->get('https://beyondchats.com/blogs/');
        $html = $response->getBody()->getContents();

        $crawler = new Crawler($html);

        // Step 2: Finding blog cards (IMPORTANT: selector may change)
        $articles = $crawler->filter('article');

        if ($articles->count() === 0) {
            $this->error('No articles found. Selector may be wrong.');
            return;
        }

        // Step 3: Taking last 5 (oldest)
        $articles->slice(-5)->each(function (Crawler $node) {

            $title = trim($node->filter('h2')->text());
            $link = $node->filter('a')->attr('href');

            // Fetch article detail page
            $client = new Client();
            $articlePage = $client->get($link)->getBody()->getContents();
            $articleCrawler = new Crawler($articlePage);

            $content = trim(
                $articleCrawler->filter('article')->text()
            );

            Article::firstOrCreate(
                ['slug' => Str::slug($title)],
                [
                    'title' => $title,
                    'content' => $content,
                ]
            );
        });

        $this->info('Scraping completed successfully.');
    }
}