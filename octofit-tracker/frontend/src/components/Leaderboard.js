import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  function rankBadgeClass(rank) {
    if (rank === 1) return 'rank-badge rank-1';
    if (rank === 2) return 'rank-badge rank-2';
    if (rank === 3) return 'rank-badge rank-3';
    return 'rank-badge rank-default';
  }

  return (
    <div className="card octofit-card">
      <div className="card-header">
        <h4>&#127942; Leaderboard</h4>
      </div>
      <div className="card-body p-0">
        {error && (
          <div className="alert alert-danger m-3" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th style={{width: '60px'}}>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No entries found.</td></tr>
                ) : (
                  entries.map((entry, idx) => (
                    <tr key={entry.id || idx}>
                      <td><span className={rankBadgeClass(idx + 1)}>{idx + 1}</span></td>
                      <td>{entry.user && typeof entry.user === 'object' ? entry.user.username : entry.user}</td>
                      <td><strong>{entry.score}</strong></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
