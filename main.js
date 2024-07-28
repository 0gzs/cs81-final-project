let tasks = [
]

document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage()
    renderTasks()
})

function renderTasks() {
    const taskList = document.getElementById('allTasks')
    const greeting = getGreeting()
    document.getElementById('greeting').innerHTML = greeting
    taskList.innerHTML = ""

    tasks.forEach((task, i) => {
        const taskElement = createTaskElement(task, i + 1)
        taskList.appendChild(taskElement)
    })
}

function getGreeting() {
    const now = new Date()
    const hour = now.getHours()
    let greeting

    if (hour < 12) greeting = "Good morning"
    else if (hour < 18) greeting = "Good afternoon"
    else greeting = "Good evening"

    return greeting
}

function createTaskElement(task, id) {
    const taskElement = document.createElement('li')
    const priority = task.priority
    taskElement.draggable = true
    taskElement.id = id
    taskElement.classList.add('task-container')
    taskElement.innerHTML = `
        <div style="padding: 2rem; position: relative">
            <input class="check" type="checkbox" id="task-completed-${id}" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${id})" />
            <label for="task-completed-${id}"></label>
        </div>
        <div style="flex: 1" class='task-wrapper'>
            <h2 class='task-title ${task.completed ? 'completed' : ''}'>${task.title}</h2>
            <span style="display: flex; align-items: center; gap: 2.5rem">
                <p class='task-dueDate'>${task.dueDate}</p>
                <span class="${priority == "low" ? 'priority priority-low' : priority == "medium" ? 'priority priority-medium' : 'priority priority-high'}">${priority.toUpperCase()}</span>
            </span>
            <span>
                <h3>Description:</h3>
                <p class='task-description ${task.completed ? 'completed' : ''}'>${task.description}</p>
            </span>
            <span class="btn-container">
                <button class='btn btn-edit' onclick="editTask(${id})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class='btn btn-delete' onclick="deleteTask(${id})"><i class="fa-solid fa-trash-can"></i></delete>
            </span>
        </div>
    `
    return taskElement
}

function createTaskForm(task = {}) {
    const isEdit = !!task.id
    const formId = isEdit ? task.id : 'taskForm'
    const title = task.title || ''
    const description = task.description || ''
    const priority = task.priority || 'low'
    const dueDate = task.dueDate ? new Date(task.dueDate) : new Date()
    const dueDay = dueDate.getDay()
    const dueMonth = dueDate.toLocaleString('default', { month: 'long' });
    const dueYear = dueDate.getFullYear()

    const taskForm = document.createElement('li')
    taskForm.draggable = true
    taskForm.id = formId
    taskForm.classList.add('task-container')
    taskForm.innerHTML = `
        <div style="padding: 2rem; position: relative">
            <input disabled class="check" type="checkbox" id="task-completed-${task.id}" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${task.id})" />
            <label for="task-completed-${task.id}"></label>
        </div>
        <div style="flex: 1" class='task-wrapper'>

            <input id='task-id' type='hidden' value="${task.id || ''}" />
            <h2 class='task-title'><input id='task-title' type='text' placeholder="Title" value="${title}" /></h2>

            <div id="task-date">
                <select id='due-month' class='date-selector'>${generateMonthOptions(dueMonth)}</select>
                <select id='due-day' class='date-selector'>${generateDayOptions(dueDay)}</select>
                <select id='due-year' class='date-selector'>${generateYearOptions(dueYear)}</select>
            </div>
            
            <div style="display: flex; gap: 1.5rem">
                <input hidden type="radio" id="task-priority-low" name='priority' value='low' ${priority == 'low' ? 'checked' : ''} />
                <span id="form-low-priority" class="priority priority-select" onclick="selectPriority('low')">LOW</span>

                <input hidden type="radio" id="task-priority-medium" name='priority' value='medium' ${priority == 'medium' ? 'checked' : ''} />
                <span id="form-medium-priority" class="priority priority-select" onclick="selectPriority('medium')">MEDIUM</span>

                <input hidden type="radio" id="task-priority-high" name='priority' value='high' ${priority == 'high' ? 'checked' : ''} />
                <span id="form-high-priority" class="priority priority-select" onclick="selectPriority('high')" >HIGH</span>
            </div>

            <span>
                <h3>Description:</h3>
                <p class='task-description'><input id='task-description' type='text' style="border-bottom: 1.5px solid #aeaeae; width: 100%" value="${description}" /></p>
            </span>
            
            <span class='btn-container'>
                <button class='btn btn-save' id="saveTaskButton">Save</button>
                <button class='btn btn-cancel' id="cancelTaskButton">Cancel</button>
            </span>
        </div>
    `

    taskForm.querySelector('#saveTaskButton').addEventListener('click', () => saveTask(taskForm))
    taskForm.querySelector('#cancelTaskButton').addEventListener('click', () => cancelTask(taskForm, isEdit ? task.id : null))

    return taskForm
}

function generateDayOptions(selectedDay) {
    let options = ''
    for (let i = 1; i <= 31; i++) {
        options += `<option value="${i}" ${i === selectedDay ? 'selected' : ''}>${i}</option>`
    }
    return options
}

function generateMonthOptions(selectedMonth) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let options = ''
    months.forEach(month => {
        options += `<option value="${month}" ${month === selectedMonth ? 'selected' : ''}>${month}</option>`
    })
    return options
}

function generateYearOptions(selectedYear) {
    let options = ''
    const currentYear = new Date().getFullYear()
    for (let i = currentYear; i <= currentYear + 5; i++) {
        options += `<option value="${i}" ${i === selectedYear ? 'selected' : ''}>${i}</option>`
    }
    return options
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id == taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage();
        renderTasks();
    }
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
    const day = document.getElementById('due-day').value
    const month = document.getElementById('due-month').value
    const year = document.getElementById('due-year').value
    const dueDate = `${month} ${day.padStart(2, '0')} ${year}`

    if (title && description && priority) {
        if (id) {
            const task = tasks.find(t => t.id == id)
            task.title = title
            task.description = description
            task.priority = priority
            task.dueDate = dueDate
        } else {
            let task = {
                id: tasks.length + 1,
                title,
                description,
                dueDate,
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

function selectPriority(priority) {
    const allPriorityRadioButtons = document.querySelectorAll('.priority-select')
    allPriorityRadioButtons.forEach(span => {
        const classes = span.classList
        classes.forEach(clss => {
            if (clss == "priority-low") span.classList.remove("priority-low")
            else if (clss == "priority-medium") span.classList.remove("priority-medium")
            else if (clss == "priority-high") span.classList.remove("priority-high")
        })
    })

    const radioButton = document.getElementById(`task-priority-${priority}`)
    radioButton.checked = true

    const buttonContainer = document.getElementById(`form-${priority}-priority`)
    buttonContainer.classList.add(`priority-${priority}`)
}
