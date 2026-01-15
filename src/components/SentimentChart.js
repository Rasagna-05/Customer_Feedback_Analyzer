
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#6db377ff', '#9c4a45ff', '#a5a145ff']; // positive, negative, neutral

function SentimentChart({ summary }) {
  if (!summary || summary.total === 0) {
    return (
      <div className="card">
        <h2>Sentiment Overview</h2>
        <p>No data to display.</p>
      </div>
    );
  }

  const data = [
    { name: 'Positive', value: summary.positive || 0 },
    { name: 'Negative', value: summary.negative || 0 },
    { name: 'Neutral', value: summary.neutral || 0 },
  ];

  return (
    <div className="card chart-card">
      <h2>Sentiment Overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={80} label>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p>Total feedback: {summary.total}</p>
    </div>
  );
}

export default SentimentChart;
