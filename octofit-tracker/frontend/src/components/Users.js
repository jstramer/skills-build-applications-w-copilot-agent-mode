import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header">
        <h4>&#128100; Users</h4>
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
                  <th>Username</th>
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No users found.</td></tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={user.id || idx}>
                      <td><span className="fw-semibold">{user.username}</span></td>
                      <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                      <td>
                        {user.team && typeof user.team === 'object'
                          ? <span className="badge bg-secondary">{user.team.name}</span>
                          : user.team
                            ? <span className="badge bg-secondary">{user.team}</span>
                            : <span className="text-muted">—</span>
                        }
                      </td>
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

export default Users;
