// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

// Listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// Functions
function addTodo(e) {
    // Remove default event on button
    e.preventDefault()

    // Check empty input todo
    if (todoInput.value === "") {
        todoInput.setAttribute("placeholder", "Entrez un nouvel élément")
    } else {
        // Add a todoDiv
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        // Add a li element
        const newTodo = document.createElement("li")
        newTodo.innerHTML = todoInput.value
        newTodo.classList.add("todo-item", "col", "s10")
        // Add this todo in local storage
        saveLocalTodos(todoInput.value)
        // li into div todo
        todoDiv.appendChild(newTodo)

        // Add button checked
        const completeButton = document.createElement("button")
        completeButton.innerHTML = "<i class='material-icons small'>check</i>"
        completeButton.classList.add("complete-btn", "btn-small", "col", "s1")
        // button checked into todoDiv
        todoDiv.appendChild(completeButton)

        // Delete button checked
        const trashButton = document.createElement("button")
        trashButton.innerHTML = "<i class='material-icons small'>close</i>"
        trashButton.classList.add("trash-btn", "btn-small", "red", "col", "s1")
        // button trash into todoDiv
        todoDiv.appendChild(trashButton)

        // Add the new todo into Todo List
        todoList.appendChild(todoDiv)
        todoInput.value = ""
    }

}

function deleteCheck(e) {
    const item = e.target

    // Delete the parent 'todo' onclick 'trash-btn'
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        todo.classList.add("fade-out-bck")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function () {
            todo.remove()
        })
    }

    // Checked todo
    if (item.classList[0] === "complete-btn") {
        item.parentElement.classList.toggle("completed");
    }

}

// LOCALSTORAGE Functions
function saveLocalTodos(todo) {
    // Checking if existing items

    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))

}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))

    }

    todos.forEach(function (todo) {
        // Add a todoDiv
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        // Add a li element
        const newTodo = document.createElement("li")
        newTodo.innerHTML = todo
        newTodo.classList.add("todo-item", "col", "s10")
        // li into div todo
        todoDiv.appendChild(newTodo)

        // Add button checked
        const completeButton = document.createElement("button")
        completeButton.innerHTML = "<i class='material-icons small'>check</i>"
        completeButton.classList.add("complete-btn", "btn-small", "col", "s1")
        // button checked into todoDiv
        todoDiv.appendChild(completeButton)

        // Delete button checked
        const trashButton = document.createElement("button")
        trashButton.innerHTML = "<i class='material-icons small'>close</i>"
        trashButton.classList.add("trash-btn", "btn-small", "red", "col", "s1")
        // button trash into todoDiv
        todoDiv.appendChild(trashButton)


        // Add the new todo into Todo List
        todoList.appendChild(todoDiv)
    })

}

function removeLocalTodos(todo) {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerHTML
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}