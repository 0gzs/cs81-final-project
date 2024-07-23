document.addEventListener('DOMContentLoaded', () => {
    let tasks = [
        { id: 1, title: 'Start Todo List', description: 'Final Project', dueDate: '2024-22-07', priority: 'high' },
        // ....
    ]
    
    function renderTasks() {
        const taskList = document.getElementById('allTasks')
        taskList.innerHTML = ""
    
        tasks.forEach(task => {
            const li = document.createElement('li')
    
            li.draggable = true
            li.id = task.id
            li.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>${task.dueDate}</p>
                <p>${task.priority}</p>
                <button>Edit Task</button>
                <button onClick="alert('Hi')">Delete</delete>
            `
            taskList.appendChild(li)
        })
    }
    
    renderTasks()
})