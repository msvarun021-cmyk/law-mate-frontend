import React from 'react';

const NewsCard = ({ article }) => (
  <div className="news-card">
    <h3>{article.title}</h3>
    <p className="news-source">{article.source}</p>
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
      Read More
    </a>
  </div>
);

export default NewsCard;