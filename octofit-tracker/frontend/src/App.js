import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';
import './App.css';

function Home() {
  return (
    <div className="octofit-hero mt-4">
      <img src={logo} alt="OctoFit" className="hero-logo" />
      <h1>OctoFit Tracker</h1>
      <p className="mb-4">Track activities, compete with your team, and crush your fitness goals.</p>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <NavLink className="btn btn-danger btn-lg px-4" to="/users">Users</NavLink>
        <NavLink className="btn btn-outline-light btn-lg px-4" to="/teams">Teams</NavLink>
        <NavLink className="btn btn-outline-light btn-lg px-4" to="/activities">Activities</NavLink>
        <NavLink className="btn btn-outline-light btn-lg px-4" to="/workouts">Workouts</NavLink>
        <NavLink className="btn btn-outline-light btn-lg px-4" to="/leaderboard">Leaderboard</NavLink>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="OctoFit" className="brand-logo" />
            <span className="brand-text">OctoFit</span>
            <span className="text-white"> Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofit-nav"
            aria-controls="octofit-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="octofit-nav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
