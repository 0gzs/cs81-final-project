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
                <button onclick="alert('Hi')">Delete</delete>
            `
            taskList.appendChild(li)
        })
    }

    renderTasks()
})

// Add task to populate form to then 'saveTask'
function addTask() {
    const taskList = document.getElementById('allTasks')
    const taskForm = document.createElement('li')

    taskForm.id = 'taskForm'
    taskForm.innerHTML = `
            <input type='text' placeholder="Title" />
            <input type='text' placeholder='Description' />
            <div><input id='priority-low' type='radio' name="priority" value="low" />!</div>
            <div><input id='priority-medium' type='radio' name="priority" value="medium" />!!</div>
            <div><input id='priority-high' type='radio' name="priority" value="high" />!!!</div>
            <button onclick="alert('saveTask()')">Save</button>
            <button onclick="cancelTask()">Cancel</button>
        `

    taskList.appendChild(taskForm)
}

function cancelTask() {
    const taskForm = document.getElementById('taskForm')

    if (taskForm) taskForm.remove()
}
