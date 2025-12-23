BeyondChats Scraper & AI Article Enhancer

📌 Project Overview:

This project is a full-stack application that demonstrates an end-to-end pipeline for scraping blog content, enhancing it using AI, and presenting both original and updated versions through a modern frontend.

The system:

1. Scrapes articles from BeyondChats
2. Stores them in a Laravel backend
3. Uses a Node.js automation pipeline to:

-   Search for relevant external articles
-   Scrape reference content
-   Rewrite the original article using an LLM
-   Attach proper citations

4. Displays both original and AI-updated articles in a React frontend

This project focuses on real-world scraping challenges, automation workflows, AI integration, and defensive frontend rendering.

---

🧱 Tech Stack:

Backend-

-   Laravel 11
-   SQLite (local)
-   REST APIs

Automation / AI-

-   Node.js
-   Axios, Cheerio
-   DuckDuckGo Lite (search)
-   OpenAI API (LLM)

Frontend-

-   React (Vite)
-   Axios
-   CSS (responsive grid layout)

📁 Repository Structure:

flowchart TD
ROOT[Beyondcharts-Scrapper]

    ROOT --> A[beyondchats-backend]
    ROOT --> B[article-ai]
    ROOT --> C[beyondchats-frontend]
    ROOT --> D[README.md]

    A --> A1[Laravel App]
    A --> A2[SQLite Database]
    A --> A3[REST APIs]

    B --> B1[Node.js Automation]
    B --> B2[Web Search]
    B --> B3[AI Rewriting]
    B --> B4[Reference Citing]

    C --> C1[React App]
    C --> C2[Articles UI]
    C --> C3[API Integration]

---

⚙️ Local Setup Instructions

✅ Prerequisites:

Make sure you have:

-   Node.js (v18+)
-   PHP (8.2+)
-   Composer
-   OpenAI API Key

🔹 1. Backend Setup (Laravel)

-   cd beyondchats-backend
-   composer install
-   cp .env.example .env
-   php artisan key:generate
-   php artisan migrate
-   php artisan serve

Backend will run at:

-   http://127.0.0.1:8000

Test API:

-   http://127.0.0.1:8000/api/articles

🔹 2. Automation Script Setup (Node.js)

-   cd ../article-ai
-   npm install

Create .env file:

-   LARAVEL_API=http://127.0.0.1:8000/api
-   OPENAI_API_KEY=your_openai_api_key_here

Run automation:

-   node index.js

This script:

-   Fetches the latest article from the backend
-   Searches the web for relevant articles
-   Scrapes reference content
-   Rewrites the article using AI
-   Publishes the updated article back to the backend

🔹 3. Frontend Setup (React)

-   cd ../beyondchats-frontend
-   npm install
-   npm run dev

Frontend will run at:

http://localhost:5173

---

🔁 Data Flow / Architecture Diagram

    flowchart TD

    A[BeyondChats Website] --> |Scraping| B[Laravel Backend<br/>Articles API + SQLite]
    B --> |Fetch latest article| C[Node.js Automation]
    C --> |Web Search + Scraping| D[External Reference Articles]
    D --> |Content Extraction| C
    C --> |AI Rewriting + Citation| B
    B --> |Fetch all articles| E[React Frontend]

This diagram shows the entire end-to-end pipeline clearly.

---

🧠 Key Highlights

-   Clean separation of backend, automation, and frontend
-   Real-world scraping challenges handled with fallbacks
-   AI-generated content with proper citation
-   Responsive and clean UI
-   Defensive frontend rendering for scraped content

---

📝 Notes

-   SQLite is used for simplicity in local setup
-   AI rewriting is intentionally transparent with references
-   Content formatting is handled defensively due to scraped data variability
