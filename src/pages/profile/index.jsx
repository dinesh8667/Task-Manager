import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Index = () => {
    const navigate = useNavigate()
    const storedData = localStorage.getItem('userDetails')
    const userDetails = JSON.parse(storedData)
    const storedTask = localStorage.getItem('task')
    const task = JSON.parse(storedTask)

    function handleLogOut(params) {
        const choice = confirm("Do you want to logout?")
        if (choice){
            localStorage.removeItem('isLogIn')
            navigate('/login')
        }
    }
  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="avatar-container">
          <i className="bi bi-person-circle avatar-image"></i>
        </div>
        <h1 className="profile-name">{userDetails.name}</h1>
        <p className="profile-email">{userDetails.email}</p>
        <hr className="profile-divider" />
        <div className="profile-actions">
          <button className="btn-logout" onClick={handleLogOut}>
            <i className="bi bi-box-arrow-left btn-icon"></i>
            Logout
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">TASKS</span>
            <span className="state-value">{storedTask ? task.length : 0}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">COMPLETED</span>
            <span className="state-value">{storedTask ? task?.filter((item) => item.status === 'Completed').length : 0}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Pending</span>
            <span className="state-value">{storedTask ? task?.filter((item) => item.status === 'Pending').length : 0}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">High Priority</span>
            <span className="state-value">{storedTask ? task?.filter((item) => item.priority === 'High').length : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;