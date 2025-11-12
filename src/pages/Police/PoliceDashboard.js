// This file exactly matches the screenshot: `Screenshot 2025-11-06 094648.png`
import NewsCard from '../../components/NewsCard';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPoliceDashboard } from '../../services/policeService';
import './PoliceDashboard.css'; // We'll create this

const NewsCard = ({ article }) => (
  <div className="news-card">
    <h3>{article.title}</h3>
    <p className="news-source">{article.source}</p>
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
      Read More
    </a>
  </div>
);

const PoliceDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({ news: [], recent_firs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getPoliceDashboard();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="police-dashboard">
      <div className="page-header">
        <h1>Police Dashboard</h1>
        <p>Welcome back, Officer {user.username}.</p>
      </div>

      <section className="news-section">
        <h2>Today's Law-Related News</h2>
        <div className="news-grid">
          {dashboardData.news.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </section>

      <section className="firs-section card">
        <h2>Recent FIRs</h2>
        <table className="firs-table">
          <thead>
            <tr>
              <th>FIR ID</th>
              <th>Date</th>
              <th>Sections</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.recent_firs.map((fir) => (
              <tr key={fir.fir_id_str}>
                <td>{fir.fir_id_str}</td>
                <td>{fir.date}</td>
                <td>{fir.sections}</td>
                <td className="actions">
                  <button title="View">👁️</button>
                  <button title="Download">⬇️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PoliceDashboard;