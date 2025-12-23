import { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";
import ArticleCard from "../components/ArticleCard";
import "../styles/app.css";

function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles()
            .then(setArticles)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="loading">Loading articles...</p>;
    }

    return (
        <div className="container">
            <h1>BeyondChats Articles</h1>

            <div className="articles-grid">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}

export default ArticlesPage;
