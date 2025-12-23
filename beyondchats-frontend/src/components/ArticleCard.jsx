function ArticleCard({ article }) {
    const cleanedContent = article.content
        ? article.content.replace(/^#.*\n/, "").trim()
        : "";

    return (
        <div className={`card ${article.is_updated ? "updated" : ""}`}>
            {/* Title + Updated badge */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>{article.title}</h2>
                {article.is_updated && <span className="badge">Updated</span>}
            </div>

            {/* Article content */}
            <p className="content clamp">{cleanedContent}</p>

            {/* References */}
            {article.is_updated && article.references?.length > 0 && (
                <>
                    <h4>References</h4>
                    <ul className="refs">
                        {article.references.map((ref, idx) => (
                            <li key={idx}>
                                <a href={ref} target="_blank" rel="noreferrer">
                                    Source {idx + 1}
                                </a>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default ArticleCard;
