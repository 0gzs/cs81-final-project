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

    tasks.forEach((task, i) => {
        const taskElement = createTaskElement(task, i + 1)
        taskList.appendChild(taskElement)
    })
}

function createTaskElement(task, id) {
    const taskElement = document.createElement('li')
    taskElement.draggable = true
    taskElement.id = id
    taskElement.innerHTML = `
        <p class='task-title'>${task.title}</p>
        <p class='task-description'>${task.description}</p>
        <p class='task-dueDate'>${task.dueDate}</p>
        <p class='task-priority'>${task.priority}</p>
        <button class='btn btn-edit' onclick="editTask(${id})">Edit Task</button>
        <button class='btn btn-delete' onclick="deleteTask(${id})">Delete</delete>
    `
    return taskElement
}

function createTaskForm(task = {}) {
    const isEdit = !!task.id
    const formId = isEdit ? task.id : 'taskForm'
    const title = task.title || ''
    const description = task.description || ''
    const priority = task.priority || 'low'

    const taskForm = document.createElement('li')
    taskForm.draggable = true
    taskForm.id = formId
    taskForm.innerHTML = `
        <input id='task-id' type='hidden' value="${task.id || ''}" />
        <input id='task-title' type='text' placeholder="Title" value="${title}" />
        <input id='task-description' type='text' placeholder='Description' value="${description}" />
        <div>
            <span><input id='priority-low' type='radio' name="priority" value="low" ${priority == 'low' ? 'checked' : ''} />!</span>
            <span><input id='priority-medium' type='radio' name="priority" value="medium" ${priority == 'medium' ? 'checked' : ''} />!!</span>
            <span><input id='priority-high' type='radio' name="priority" value="high" ${priority == 'high' ? 'checked' : ''} />!!!</span>
        </div>
        <button id="saveTaskButton">Save</button>
        <button id="cancelTaskButton">Cancel</button>
    `

    taskForm.querySelector('#saveTaskButton').addEventListener('click', () => saveTask(taskForm))
    taskForm.querySelector('#cancelTaskButton').addEventListener('click', () => cancelTask(taskForm, isEdit ? task.id : null))

    return taskForm
}

// Add task to populate form to then 'saveTask'
function addTask() {
    const taskList = document.getElementById('allTasks')
    const taskForm = createTaskForm()

    taskList.appendChild(taskForm)
}

function editTask(taskId) {
    const task = tasks.find(t => t.id == taskId)

    if (task) {
        const taskForm = createTaskForm(task)
        const taskElement = document.getElementById(task.id)
        taskElement.replaceWith(taskForm)
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId)
    saveTasksToLocalStorage()
    renderTasks()
}

function cancelTask(taskForm, taskId = null) {
    if (taskId) {
        const task = tasks.find(t => t.id == taskId)
        const taskElement = createTaskElement(task, taskId)
        taskForm.replaceWith(taskElement)
    } else taskForm.remove()
}

function saveTask(taskForm) {
    const id = document.getElementById('task-id').value
    const title = document.getElementById('task-title').value
    const description = document.getElementById('task-description').value
    const priority = document.querySelector('input[name="priority"]:checked').value

    if (title && description && priority) {
        if (id) {
            const task = tasks.find(t => t.id == id)
            task.title = title
            task.description = description
            task.priority = priority
        } else {
            let task = {
                id: tasks.length + 1,
                title,
                description,
                dueDate: '',
                priority
            }
            tasks.push(task)
        }
        saveTasksToLocalStorage()
        cancelTask(taskForm)
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
    }
}
