
export function taskProcessor(task, search, activeFilter, activeSort, setFilteredData, setTotalPages, currentPage) {
    let processedData = [...task];
    const priorityWeights = { High: 3, Medium: 2, Low: 1 };
    const today = new Date().toISOString().split('T')[0];
    const startIndex = (currentPage - 1) * 8
    const endIndex = currentPage * 8

    if (search) {
        const normalizedQuery = search.toLowerCase();
        processedData = processedData.filter((item) =>
            item.title.toLowerCase().includes(normalizedQuery)
        );
    }

    if (activeFilter) {
        const [category, value] = activeFilter.split('-');

        if (category === 'status') {
            processedData = processedData.filter(item => item.status === value);
        } else if (category === 'priority') {
            processedData = processedData.filter(item => item.priority === value);
        } else if (category === 'date' && value === 'today') {
            processedData = processedData.filter(item => item.date === today);
        }
    }

    if (activeSort) {
        const [category, value] = activeSort.split('-');
        if (category === 'date') {
            processedData = value === 'old' ? processedData.sort((a, b) => a.date.localeCompare(b.date)) :
                processedData.sort((a, b) => b.date.localeCompare(a.date))
        } else if (category === 'priority') {
            processedData = value === 'low' ? processedData.sort((a, b) => priorityWeights[a.priority] - priorityWeights[b.priority]) :
                processedData.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority])
        } else if (category === 'title') {
            processedData = value === 'ascending' ? processedData.sort((a, b) => a.title.localeCompare(b.title)) :
                processedData.sort((a, b) => b.title.localeCompare(a.title))
        }
    }
    setTotalPages(Math.ceil(processedData.length / 8))
    processedData = processedData.slice(startIndex, endIndex)
    setFilteredData(processedData);
}

export function handleStatusChange(id, task, setTask) {
    const choice = confirm('Do you want to change the status of the task?');
    if (choice) {
        const updatedTasksList = task.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    status: item.status === 'Pending' ? 'Completed' : 'Pending'
                };
            }
            return item;
        });
        setTask(updatedTasksList);
        localStorage.setItem('task', JSON.stringify(updatedTasksList));
    }
}

export function handleRemove(id, task, setTask) {
    const choice = confirm('Do you want to remove this task?');
    if (choice) {
        const newTasks = task.filter((item) => item.id !== id);
        localStorage.setItem('task', JSON.stringify(newTasks));
        setTask(newTasks);
    }
}