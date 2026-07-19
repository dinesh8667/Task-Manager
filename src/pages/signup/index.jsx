import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { handleSignUpSubmit } from '../../services';
import './style.css';

const Index = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = (data) => {
    handleSignUpSubmit(data, navigate);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="brand-header">
          <div className="brand-title-row">
            <div className="brand-logo-box">
              <i className="bi bi-check2-circle"></i>
            </div>
            <span className="brand-name">TaskMaster</span>
          </div>
          <p className="brand-subtitle">Management Workspace</p>
        </div>

        <h1 className="card-title">Create an Account</h1>
        <p className="card-subtitle">Sign up to start organizing your tasks efficiently.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>

            <input
              id="fullName"
              type="text"
              className="signup-input"
              placeholder="Dinesh E"
              {...register('name', {
                required: 'Full Name is required',
              })}
            />

            {errors.name && (
              <small className="error-text">{errors.name.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              type="email"
              className="signup-input"
              placeholder="dinesh@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />

            {errors.email && (
              <small className="error-text">{errors.email.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              className="signup-input"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            
            {errors.password && (
              <small className="error-text">{errors.password.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <input
              id="confirmPassword"
              type="password"
              className="signup-input"
              placeholder="••••••••"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
            />

            {errors.confirmPassword && (
              <small className="error-text">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
            <i className="bi bi-arrow-right"></i>
          </button>
        </form>

        <hr className="divider" />

        <p className="login-prompt">
          Already have an account?{' '}
          <Link to="/login" className="login-link">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Index;