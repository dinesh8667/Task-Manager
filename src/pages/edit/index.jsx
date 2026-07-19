import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [allTasks, setAllTasks] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('task')) || [];
    setAllTasks(storedTasks);

    const currentTask = storedTasks.find((item) => item.id === id);

    if (currentTask) {
      reset(currentTask);
    }
  }, [id, reset]);

  const today = new Date().toISOString().split('T')[0];

  const onSubmit = (data) => {
    const updatedTasks = allTasks.map((task) =>
      task.id === id ? { ...task, ...data } : task
    );

    localStorage.setItem('task', JSON.stringify(updatedTasks));
    navigate('/dashboard');
  };

  const handleDelete = () => {
    if (!window.confirm('Do you want to remove this task?')) return;

    const remainingTasks = allTasks.filter((task) => task.id !== id);

    localStorage.setItem('task', JSON.stringify(remainingTasks));
    navigate('/dashboard');
  };

  return (
    <div className="edit-task-wrapper">
      <div className="back-link-container">
        <button
          className="back-link"
          onClick={() => navigate('/dashboard')}
        >
          <i className="bi bi-arrow-left back-icon"></i>
          Back to My Tasks
        </button>
      </div>

      <div className="edit-task-card">
        <div className="card-header">
          <h1 className="form-title">Edit Task</h1>
          <p className="form-subtitle">
            Update the details of your task.
          </p>
        </div>

        <hr className="divider top-divider" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="title">Task Title</label>

            <input
              id="title"
              type="text"
              {...register('title', {
                required: 'Task title is required',
                minLength: {
                  value: 5,
                  message: 'Title must contain at least 5 characters',
                },
              })}
            />

            {errors.title && (
              <small className="error-text">
                {errors.title.message}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              rows="4"
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 10,
                  message:
                    'Description must be at least 10 characters',
                },
              })}
            />

            {errors.description && (
              <small className="error-text">
                {errors.description.message}
              </small>
            )}
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="date">Due Date</label>

              <input
                id="date"
                type="date"
                min={today}
                {...register('date', {
                  required: 'Due date is required',
                })}
              />

              {errors.date && (
                <small className="error-text">
                  {errors.date.message}
                </small>
              )}
            </div>

            <div className="form-group half-width">
              <label htmlFor="status">Status</label>

              <div className="select-container">
                <select
                  id="status"
                  {...register('status', {
                    required: 'Status is required',
                  })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>

                <i className="bi bi-chevron-down chevron-icon"></i>
              </div>

              {errors.status && (
                <small className="error-text">
                  {errors.status.message}
                </small>
              )}
            </div>
          </div>

          <div className="form-row">
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

              {errors.priority && (
                <small className="error-text">
                  {errors.priority.message}
                </small>
              )}
            </div>
          </div>

          <hr className="divider" />

          <div className="form-actions-bar">
            <button
              type="button"
              className="btn-delete"
              onClick={handleDelete}
            >
              <i className="bi bi-trash btn-icon"></i>
              Delete Task
            </button>

            <div className="right-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </button>

              <button type="submit" className="btn-update">
                <i className="bi bi-floppy btn-icon"></i>
                Update Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;