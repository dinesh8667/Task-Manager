import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const isLogIn = localStorage.getItem('isLogIn');
  const navigate = useNavigate();
  return (
    <nav className="top-navbar">
      <div className="navbar-brand">
        <h1>TaskMaster</h1>
        <div className='brand-logo'>
          <div><i className="bi bi-check2-circle"></i></div>
          TM
        </div>
      </div>

      <div className="navbar-actions">
        {
          isLogIn && <button className="create-task-btn" onClick={() => navigate('/create')}>
            <i className="bi bi-plus-lg plus-icon"></i>
            <span>Create Task</span>
          </button>
        }


        {
          isLogIn ? <i className="bi bi-person-circle user-avatar" onClick={()=>navigate('/profile')}></i> : <button className='create-task-btn' onClick={()=>navigate('/login')}>Log In</button>
        }

      </div>
    </nav>
  );
};

export default Index;