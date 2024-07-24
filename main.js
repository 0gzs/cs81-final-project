let tasks = [
    { id: 1, title: 'Start Todo List', description: 'Final Project', dueDate: '2024-22-07', priority: 'high' },
    // ....
]

document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage()
    renderTasks()
})

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

// Add task to populate form to then 'saveTask'
function addTask() {
    const taskList = document.getElementById('allTasks')
    const taskForm = document.createElement('li')

    taskForm.id = 'taskForm'
    taskForm.innerHTML = `
            <input id='task-title' type='text' placeholder="Title" />
            <input id='task-description' type='text' placeholder='Description' />
            <div><input id='priority-low' type='radio' name="priority" value="low" />!</div>
            <div><input id='priority-medium' type='radio' name="priority" value="medium" />!!</div>
            <div><input id='priority-high' type='radio' name="priority" value="high" />!!!</div>
            <button onclick="saveTask()">Save</button>
            <button onclick="cancelTask()">Cancel</button>
        `

    taskList.appendChild(taskForm)
}

function cancelTask() {
    const taskForm = document.getElementById('taskForm')

    if (taskForm) taskForm.remove()
}

function saveTask() {
    const title = document.getElementById('task-title').value
    const description = document.getElementById('task-description').value
    const priority = document.querySelector('input[name="priority"]:checked').value

    if (title && description && priority) {
        let task = {
            id: tasks.length + 1,
            title,
            description,
            dueDate: '',
            priority
        }
        tasks.push(task)
        saveTasksToLocalStorage()
        cancelTask()
        renderTasks()
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
        tasks = JSON.parse(storedTasks)
        console.log(tasks)
    }
}
