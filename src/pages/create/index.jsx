import React, { useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Index = () => {
  const oldTask = localStorage.getItem('task')
  const [task, setTask] = useState(oldTask ? JSON.parse(oldTask) : [])
  const navigate = useNavigate()
  
  function handleSave(e){
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newTask = {id: String(Date.now()), ...Object.fromEntries(formData)}
    setTask((prev) => [...prev, newTask])
    navigate('/dashboard')
  }  

  useEffect(()=>{
    localStorage.setItem('task', JSON.stringify(task))
  },[task])
  
  return (
    <div className="create-task-wrapper">
      <div className="create-task-card">
        <h1 className="form-title">Create New Task</h1>
        <p className="form-subtitle">Fill in the details below to add a new task to your workspace.</p>
        
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="taskTitle">Title</label>
            <input 
            name='title'
              type="text" 
              id="taskTitle" 
              placeholder="e.g., Finalize Q3 Marketing Report" 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="taskDescription">Description</label>
            <textarea 
            name='description'
              id="taskDescription" 
              placeholder="Briefly describe the task objectives..."
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="dueDate">Due Date</label>
              <div className="input-with-icon">
                <input 
                name='date'
                  type="date" 
                  id="dueDate" 
                  required
                />
              </div>
            </div>
            
            <div className="form-group half-width">
              <label htmlFor="priority">Priority</label>
              <div className="select-container">
                <select name='priority' id="priority" defaultValue="Medium">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <i className="bi bi-chevron-down chevron-icon"></i> 
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="form-group">
            <label className="status-label">Initial Status</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="status" value="Pending" defaultChecked />
                <span className="radio-text">Pending</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="status" value="Completed" />
                <span className="radio-text">Completed</span>
              </label>
            </div>
          </div>

          <hr className="divider" />

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={()=>navigate('/dashboard')}>Cancel</button>
            <button type="submit" className="btn-save">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index