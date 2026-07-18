import React, { useEffect, useState } from 'react';
import { InitialTask } from '../../services';
import { taskProcessor, handleStatusChange, handleRemove } from '../../customHooks/hooks';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Index = () => {
  const isLogIn = localStorage.getItem('isLogIn');
  const userDetails = localStorage.getItem('userDetails')
  const storedtask = localStorage.getItem('task')
  const [task, setTask] = useState(storedtask ? JSON.parse(storedtask) : []);
  const [filterdData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeSort, setActiveSort] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    taskProcessor(task, search, activeFilter, activeSort, setFilteredData, setTotalPages, currentPage)
  }, [search, activeSort, activeFilter, task, currentPage]);

  function handleFilter(e) {
    setSort({ ...filter, [e.target.name]: e.target.value })
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Hello {JSON.parse(userDetails).name}!</h1>
        <p className="dashboard-subtitle">Overview of your current workspace and tasks.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Tasks</span>
            <i className="bi bi-file-earmark-text stat-icon"></i>
          </div>
          <div className="stat-value">{isLogIn ? task?.length : 0}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Completed</span>
            <i className="bi bi-patch-check stat-icon"></i>
          </div>
          <div className="stat-value">{isLogIn ? task?.filter((item) => item.status === 'Completed').length : 0}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Pending</span>
            <i className="bi bi-exclamation-octagon stat-icon"></i>
          </div>
          <div className="stat-value">{isLogIn ? task?.filter((item) => item.status === 'Pending').length : 0}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">High Priority</span>
            <i className="bi bi-exclamation-triangle stat-icon"></i>
          </div>
          <div className="stat-value">{isLogIn ? task?.filter((item) => item.priority === 'High').length : 0}</div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-container">
          <i className="bi bi-search search-icon"></i>
          <input type="text" className="search-input" placeholder="Search tasks by title..." onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="toolbar-actions">
          <div className='select-wrapper'>
            <select
              className="filter-select"
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
            >
              <option value="">Sort Tasks</option>

              <optgroup label="Due Date">
                <option value="date-old">Old-New</option>
                <option value="date-new">New-Old</option>
              </optgroup>

              <optgroup label="Priority">
                <option value="priority-low">Low-High</option>
                <option value="priority-high">High-Low</option>
              </optgroup>

              <optgroup label="Title">
                <option value="title-ascending">Ascending</option>
                <option value="title-descending">descending</option>
              </optgroup>
            </select>
            <i className="bi bi-sort-down-alt select-chevron"></i>
          </div>

          <div className='select-wrapper'>
            <select
              className="filter-select"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              <option value="">Filter Tasks</option>

              <optgroup label="Status">
                <option value="status-Pending">Pending</option>
                <option value="status-Completed">Completed</option>
              </optgroup>

              <optgroup label="Priority">
                <option value="priority-High">High</option>
                <option value="priority-Medium">Medium</option>
                <option value="priority-Low">Low</option>
              </optgroup>

              <optgroup label="Due Date">
                <option value="date-today">Due Today</option>
              </optgroup>
            </select>
            <i className="bi bi-filter select-chevron"></i>
          </div>
        </div>
      </div>

      <div className="tasks-container">
        <div className="tasks-header">
          <div className="th-details">TASK DETAILS</div>
          <div className="th-status">STATUS</div>
          <div className="th-priority">PRIORITY</div>
          <div className="th-date">DUE DATE</div>
          <div className="th-actions">ACTIONS</div>
        </div>

        <div className="tasks-list">
          {
            !isLogIn ? <h2 className='center-text'>LogIn to get access</h2> : filterdData.length === 0 ? <h2 className='center-text'>0 tasks found</h2> :
              (filterdData?.map((item) => {
                return (
                  <div className={`task-row ${item.status === 'Completed' ? 'completed' : ''}`} key={item.id}>
                    <div className="td-details">
                      <input value={item.id} type="checkbox" className="task-checkbox" checked={item.status === 'Completed'} onChange={() => handleStatusChange(item.id, task, setTask)} />
                      <div className="task-info">
                        <span className="task-title">{item.title}</span>
                        <span className="task-desc">{item.description}</span>
                      </div>
                    </div>
                    <div className="td-status">
                      <span className={`badge ${item.status === 'Pending' ? 'badge-pending' : 'badge-completed'}`}>
                        <span className={`dot ${item.status === 'Pending' ? 'dot-blue' : 'dot-green'}`}></span>{item.status}
                      </span>
                    </div>
                    <div className="td-priority">
                      <span className={`badge ${item.priority === 'Low' ? 'badge-low' : (item.priority === 'Medium' ? 'badge-medium' : 'badge-high')}`}>{item.priority}</span>
                    </div>
                    <div className="td-date">{item.date}</div>
                    <div className="td-actions">
                      <button className="action-btn" onClick={() => navigate(`/edit/${item.id}`)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="action-btn" onClick={() => handleRemove(item.id, task, setTask)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                )
              }))
          }
        </div>
      </div>
      {
        isLogIn && filterdData.length !== 0 &&
        <div className='pagination-container'>
          <button onClick={()=>setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><i className="bi bi-chevron-double-left"></i></button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}><i className="bi bi-chevron-double-right"></i></button>
        </div>
      }
    </div>
  )
}

export default Index;