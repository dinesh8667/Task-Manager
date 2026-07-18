import React from 'react';
import { handleLoginSubmit } from '../../services';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const Index = () => {
  const storedDetails = localStorage.getItem('userDetails');
  const navigate = useNavigate();

  if (storedDetails) {
    const user = JSON.parse(storedDetails);

    if (user.email !== 'user@gmail.com') {
      localStorage.removeItem('task');
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="logo-container">
          <i className="bi bi-check2-circle logo-icon"></i>
        </div>
        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">Log in to TaskMaster</p>

        <form onSubmit={(e) => handleLoginSubmit(e, navigate)}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-container">
              <i className="bi bi-envelope input-icon"></i>
              <input
                name='email'
                type="email"
                id="email"
                className="login-input"
                placeholder="dinesh@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-container">
              <i className="bi bi-lock input-icon"></i>
              <input
                name='password'
                type="password"
                id="password"
                className="login-input"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Sign in</button>
        </form>

        <hr className="divider" />

        <p className="signup-text">
          Don't have an account? <Link to={'/signup'} className="signup-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Index;