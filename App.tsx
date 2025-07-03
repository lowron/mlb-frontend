import React, { useEffect, useState } from 'react';

interface Prediction {
  game_id: number;
  predicted_total_runs: number;
  confidence_score: number;
  outcome: string;
}

const App = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/predictions')
      .then((res) => res.json())
      .then(setPredictions);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">MLB First Inning Predictions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.map((p) => (
          <div key={p.game_id} className="bg-white/10 rounded-xl p-4 shadow-lg">
            <p className="text-lg">Game ID: {p.game_id}</p>
            <p>Predicted Runs: {p.predicted_total_runs}</p>
            <p>Confidence: {(p.confidence_score * 100).toFixed(1)}%</p>
            <p>Outcome: {p.outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
