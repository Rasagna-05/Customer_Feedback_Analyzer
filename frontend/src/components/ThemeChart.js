
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function ThemeChart({ summary }) {
  if (!summary || !summary.themes) {
    return (
      <div className="card chart-card">
        <h2>Theme Breakdown</h2>
        <p>No data to display.</p>
      </div>
    );
  }

  const data = Object.entries(summary.themes).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return (
      <div className="card chart-card">
        <h2>Theme Breakdown</h2>
        <p>No themes detected yet.</p>
      </div>
    );
  }

  return (
    <div className="card chart-card">
      <h2>Theme Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThemeChart;
