import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { handleLoginSubmit } from '../../services';
import './style.css';

const Index = () => {
  const storedDetails = localStorage.getItem('userDetails');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  if (storedDetails) {
    const user = JSON.parse(storedDetails);

    if (user.email !== 'user@gmail.com') {
      localStorage.removeItem('task');
    }
  }

  const onSubmit = (data) => {
    handleLoginSubmit(data, navigate);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="logo-container">
          <i className="bi bi-check2-circle logo-icon"></i>
        </div>

        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">Log in to TaskMaster</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>

            <div className="input-container">
              <i className="bi bi-envelope input-icon"></i>

              <input
                id="email"
                type="email"
                className="login-input"
                placeholder="dinesh@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>

            {errors.email && (
              <small className="error-text">{errors.email.message}</small>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>

            <div className="input-container">
              <i className="bi bi-lock input-icon"></i>

              <input
                id="password"
                type="password"
                className="login-input"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>

            {errors.password && (
              <small className="error-text">{errors.password.message}</small>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Sign in
          </button>
        </form>

        <hr className="divider" />

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Index;