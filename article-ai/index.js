import axios from "axios";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import OpenAI from "openai";
import "dotenv/config";

//Config
const API = process.env.LARAVEL_API;
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//1- Fetch the latest article from the Laravel API
async function fetchLatestArticle() {
    const res = await axios.get(`${API}/articles-latest`);
    return res.data;
}

//2- main Function to perform web search using DuckDuckGo LITE
async function searchWeb(query) {
    console.log("Searching web (DuckDuckGo LITE) for:", query);

    const response = await axios.post(
        "https://lite.duckduckgo.com/lite/",
        new URLSearchParams({ q: query }).toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            },
        }
    );

    const $ = cheerio.load(response.data);

    const links = [];

    $("a").each((_, el) => {
        const href = $(el).attr("href");

        if (
            href &&
            href.startsWith("http") &&
            !href.includes("duckduckgo.com") &&
            !href.includes("google.com") &&
            !href.includes("bing.com") &&
            !href.includes("youtube.com") &&
            links.length < 2
        ) {
            links.push(href);
        }
    });

    return links;
}

//3- Function to scrape article content from a given URL
async function scrapeArticleContent(url) {
    console.log("Scraping article:", url);

    const response = await axios.get(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        },
    });

    const $ = cheerio.load(response.data);

    let content =
        $("article").text() ||
        $("main").text() ||
        $("div#content").text() ||
        $("body").text();

    return content.replace(/\s+/g, " ").trim().slice(0, 3000); // limit tokens
}

//4- Function to rewrite article using OpenAI
async function rewriteArticle(
    originalArticle,
    referenceContents,
    referenceLinks
) {
    const prompt = `
You are an expert technical content writer.

Rewrite and enhance the following article to match the quality,
structure, clarity, and SEO style of the reference articles.

Add:
- Clear headings
- Bullet points where useful
- Better flow and explanations

Original Article:
${originalArticle.content}

Reference Articles:
1. ${referenceContents[0]}
2. ${referenceContents[1]}

At the end, add a section titled "References" and list:
- ${referenceLinks[0]}
- ${referenceLinks[1]}
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
}

//5- publish the updated article back to the Laravel API
async function publishUpdatedArticle(originalArticle, content, references) {
    await axios.post(`${API}/articles`, {
        title: `${originalArticle.title} (Updated)`,
        content,
        is_updated: true,
        references,
    });
}

//6- main execution flow
(async () => {
    try {
        console.log("🚀 Phase 2 Script Started\n");

        //1-fetch latest article
        const article = await fetchLatestArticle();
        console.log("Fetched article:", article.title);

        // 2. Search web
        const links = await searchWeb(article.title);
        console.log("Search result links:", links);

        if (links.length < 2) {
            throw new Error("Not enough reference articles found");
        }

        // 3. Scrape reference articles
        const referenceContents = [];
        for (const link of links) {
            const text = await scrapeArticleContent(link);
            referenceContents.push(text);
        }

        console.log("Reference articles scraped successfully");

        // 4. Rewrite article using AI
        const improvedContent = await rewriteArticle(
            article,
            referenceContents,
            links
        );

        console.log("🤖 Article rewritten using AI");

        // 5. Publish updated article
        await publishUpdatedArticle(article, improvedContent, links);

        console.log("📤 Updated article published successfully");
        console.log("\n🎉 Phase 2 completed successfully!");
    } catch (error) {
        console.error("❌ Phase 2 failed:", error.message);
    }
})();
