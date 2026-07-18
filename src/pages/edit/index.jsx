import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';

const Index = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [allTasks, setAllTasks] = useState([]);
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        date: '',
        status: '',
        priority: ''
    });

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('task')) || [];
        setAllTasks(storedTasks);
        const currentTask = storedTasks.find((item) => item.id === id);
        if (currentTask) {
            setTaskData(currentTask);
        }
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    };

    function handleUpdate(e) {
        e.preventDefault();
        const updatedTasks = allTasks.map((task) => task.id === id ? taskData : task );
        localStorage.setItem('task', JSON.stringify(updatedTasks));
        navigate('/dashboard');
    };

    function handleDelete(e) {
        const choice = confirm('Do you want to remove this task?')
        const remainingTasks = allTasks.filter((task) => task.id !== id);
        localStorage.setItem('task', JSON.stringify(remainingTasks));
        navigate('/dashboard');
    };

    return (
        <div className="edit-task-wrapper">
            <div className="back-link-container">
                <button className="back-link" onClick={() => navigate('/dashboard')}>
                    <i className="bi bi-arrow-left back-icon"></i>
                    Back to My Tasks
                </button>
            </div>

            <div className="edit-task-card">
                <div className="card-header">
                    <h1 className="form-title">Edit Task</h1>
                    <p className="form-subtitle">Update the details of your task.</p>
                </div>

                <hr className="divider top-divider" />

                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="title">Task Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title" 
                            value={taskData.title}
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={taskData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="date">Due Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={taskData.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group half-width">
                            <label htmlFor="status">Status</label>
                            <div className="select-container">
                                <select id="status" name="status" value={taskData.status} onChange={handleChange}>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <i className="bi bi-chevron-down chevron-icon"></i>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group half-width">
                            <label htmlFor="priority">Priority</label>
                            <div className="select-container">
                                <select id="priority" name="priority" value={taskData.priority} onChange={handleChange}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <i className="bi bi-chevron-down chevron-icon"></i>
                            </div>
                        </div>
                    </div>

                    <hr className="divider" />

                    <div className="form-actions-bar">
                        <button type="button" className="btn-delete" onClick={handleDelete}>
                            <i className="bi bi-trash btn-icon"></i>
                            Delete Task
                        </button>

                        <div className="right-actions">
                            <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>Cancel</button>
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