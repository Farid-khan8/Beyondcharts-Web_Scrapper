📘 README.md — BeyondChats Scraper & AI Enhancer

🔥 Project Overview:

This project is a full-stack application that:

-   1. Scrapes blog articles from BeyondChats
-   2. Stores them in a Laravel backend
-   3. Uses a Node.js automation script to:
       • Find related high-ranking articles
       • Rewrite the original article using an LLM
       • Cite reference sources
-   4. Displays both original and AI-updated articles in a React frontend

The goal is to demonstrate scraping, automation, AI integration, and frontend visualization working together end-to-end.

---

🧱 Tech Stack:

Backend-
• Laravel 11
• SQLite (local)
• REST APIs

Automation / AI-
• Node.js
• Axios, Cheerio
• DuckDuckGo Lite (search)
• OpenAI API (LLM)

Frontend-
• React (Vite)
• Axios
• CSS (responsive grid layout)

📁 Repository Structure:

Beyondcharts-Scrapper/
├── beyondchats-backend/ # Laravel backend (APIs + DB)
├── article-ai/ # Node.js automation + AI rewriting
├── beyondchats-frontend/ # React frontend
└── README.md

---

⚙️ Local Setup Instructions

✅ Prerequisites:

Make sure you have:
• Node.js (v18+)
• PHP (8.2+)
• Composer
• OpenAI API Key

🔹 1. Backend Setup (Laravel)

cd beyondchats-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

Backend will run at:

-   http://127.0.0.1:8000

Test API:

-   http://127.0.0.1:8000/api/articles

🔹 2. Automation Script Setup (Node.js)

-   cd ../article-ai
    npm install

Create .env file:

-   LARAVEL_API=http://127.0.0.1:8000/api
    OPENAI_API_KEY=your_openai_api_key_here

Run automation:

-   node index.js

This will:
• Fetch the latest article
• Search related articles
• Rewrite using AI
• Publish updated article to backend

🔹 3. Frontend Setup (React)

cd ../beyondchats-frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173

---

🔁 Data Flow / Architecture Diagram

┌──────────────┐
│ BeyondChats │
│ Website │
└──────┬───────┘
│ (Scraping)
▼
┌────────────────────┐
│ Laravel Backend │
│ - Articles API │
│ - SQLite Database │
└──────┬─────────────┘
│ (Fetch latest article)
▼
┌────────────────────┐
│ Node.js Automation │
│ - Web Search │
│ - Article Scraping │
│ - AI Rewriting │
│ - Reference Citing │
└──────┬─────────────┘
│ (POST updated article)
▼
┌────────────────────┐
│ Laravel Backend │
│ (Updated Articles) │
└──────┬─────────────┘
│ (Fetch all articles)
▼
┌────────────────────┐
│ React Frontend │
│ - Original Articles│
│ - Updated Articles │
│ - References │
└────────────────────┘

This diagram shows the entire end-to-end pipeline clearly.

---

🧠 Key Highlights
• Clean separation of backend, automation, and frontend
• Real-world scraping challenges handled with fallbacks
• AI-generated content with proper citation
• Responsive and clean UI
• Defensive frontend rendering for scraped content

---

📝 Notes
• SQLite is used for simplicity in local setup
• AI rewriting is intentionally transparent with references
• Content formatting is handled defensively due to scraped data variability
