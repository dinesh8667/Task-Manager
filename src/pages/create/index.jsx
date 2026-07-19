import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Index = () => {
  const storedTask = localStorage.getItem('task');
  const [task, setTask] = useState(storedTask ? JSON.parse(storedTask) : []);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      priority: 'Medium',
      status: 'Pending',
    },
  });

  const today = new Date().toISOString().split('T')[0];

  const onSubmit = (data) => {
    const newTask = {
      id: String(Date.now()),
      ...data,
    };

    setTask((prev) => [...prev, newTask]);
    navigate('/dashboard');
  };

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(task));
  }, [task]);

  return (
    <div className="create-task-wrapper">
      <div className="create-task-card">
        <h1 className="form-title">Create New Task</h1>
        <p className="form-subtitle">
          Fill in the details below to add a new task to your workspace.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="taskTitle">Title</label>

            <input
              id="taskTitle"
              type="text"
              placeholder="e.g., Finalize Q3 Marketing Report"
              {...register('title', {
                required: 'Task title is required',
                minLength: {
                  value: 5,
                  message: 'Title must contain at least 5 characters',
                },
              })}
            />

            {errors.title && (
              <small className="error-text">{errors.title.message}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="taskDescription">Description</label>

            <textarea
              id="taskDescription"
              rows="4"
              placeholder="Briefly describe the task objectives..."
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters',
                },
              })}
            />

            {errors.description && (<small className="error-text">{errors.description.message}</small>)}
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="dueDate">Due Date</label>

              <div className="input-with-icon">
                <input
                  id="dueDate"
                  type="date"
                  min={today}
                  {...register('date', {
                    required: 'Due date is required',
                  })}
                />
              </div>

              {errors.date && (<small className="error-text">{errors.date.message}</small>)}
            </div>

            <div className="form-group half-width">
              <label htmlFor="priority">Priority</label>

              <div className="select-container">
                <select
                  id="priority"
                  {...register('priority', {
                    required: 'Priority is required',
                  })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <i className="bi bi-chevron-down chevron-icon"></i>
              </div>

              {errors.priority && (<small className="error-text">{errors.priority.message}</small>)}
            </div>
          </div>

          <hr className="divider" />

          <div className="form-group">
            <label className="status-label">Initial Status</label>

            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="Pending"
                  {...register('status', {
                    required: 'Status is required',
                  })}
                />
                <span className="radio-text">Pending</span>
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  value="Completed"
                  {...register('status')}
                />
                <span className="radio-text">Completed</span>
              </label>
            </div>

            {errors.status && (<small className="error-text">{errors.status.message}</small>)}
          </div>

          <hr className="divider" />

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>

            <button type="submit" className="btn-save">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;