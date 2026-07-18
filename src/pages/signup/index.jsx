import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleSignUpSubmit } from '../../services';
import './style.css';

const Index = () => {
    const navigate = useNavigate();

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

                <form onSubmit={(e) => handleSignUpSubmit(e, navigate)}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            name='name'
                            className='signup-input'
                            type="text"
                            id="fullName"
                            placeholder="Dinesh E"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            name='email'
                            className='signup-input'
                            type="email"
                            id="email"
                            placeholder="dinesh@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            name='password'
                            className='signup-input'
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            required
                        />
                        <span className="helper-text">Must be at least 8 characters long.</span>
                    </div>
                    <button type="submit" className="signup-btn">
                        Sign Up
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </form>
                <hr className="divider" />
                <p className="login-prompt">
                    Already have an account? <Link to={'/login'} className="login-link">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Index;