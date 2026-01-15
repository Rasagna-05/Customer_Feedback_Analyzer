
import React, { useState, useEffect } from 'react';
import './App.css';

import ProductSelector from './components/ProductSelector';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import SentimentChart from './components/SentimentChart';
import ThemeChart from './components/ThemeChart';
import { generateInsights } from './utils/insightGenerator';


import {
  getFeedbackByProduct,
  getSentimentSummary,
  getThemeSummary,
} from './services/api';

function App() {
  const [productId, setProductId] = useState('RING001'); 
  const [feedback, setFeedback] = useState([]);
  const [sentimentSummary, setSentimentSummary] = useState(null);
  const [themeSummary, setThemeSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [insights, setInsights] = useState("");


  const loadData = async (pid) => {
    if (!pid) return;
    setLoading(true);
    setError('');

    try {
      const [fbRes, sentRes, themeRes] = await Promise.all([
        getFeedbackByProduct(pid),
        getSentimentSummary(pid),
        getThemeSummary(pid),
      ]);

      setFeedback(fbRes.data || []);
      setSentimentSummary(sentRes.data || null);
      setThemeSummary(themeRes.data || null);
    } catch (err) {
      console.error(err);
      setError('Failed to load data. Check backend/server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(productId);
  }, [productId]);
  useEffect(() => {
    setInsights('');
  }, [productId]);


  return (
    <div className="app">
      <header className="app-header">
        <h1>GIVA Feedback Hub</h1>
        <div className="brand-pill">Made by Rasagna Abothula</div>
      </header>


      <main className="app-main">
        <aside className="sidebar">
          <ProductSelector
            productId={productId}
            onChange={setProductId}
          />

          <FeedbackForm
            productId={productId}
            onFeedbackAdded={() => loadData(productId)}
          />
        </aside>

        <section className="content">
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <>
              <div className="insight-box">
                <button
                  className="insight-btn"
                  onClick={() =>
                    setInsights(
                      generateInsights(sentimentSummary, themeSummary, feedback)
                    )
                  }
                >
                  Generate Insights
                </button>

                {insights && (
                  <div className="insight-output">
                    <h3>Insights Summary</h3>
                    <p>{insights}</p>
                  </div>
                )}
              </div>

              <div className="charts">
                <SentimentChart summary={sentimentSummary} />
                <ThemeChart summary={themeSummary} />
              </div>

              <FeedbackList feedback={feedback} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
