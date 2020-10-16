const list = document.getElementById('list')
// const inputText = document.querySelector('.text-input')
const btn = document.getElementById('add-task');
//const task = document.querySelector('.task');


// ADD TASK
btn.addEventListener('click', function () {
    const inputText = document.getElementById('inputText').value
    const newTask = document.createElement('li')
    //classList
    newTask.innerHTML = inputText
    list.prepend(newTask)
    document.getElementById("inputText").value = ""
})
