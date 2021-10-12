let ul = document.querySelector('.task-list');
let input = document.querySelector('.input-task');
let tasks = document.querySelectorAll('.item-task li');

showAllTasks();

function showAllTasks() {
    let allTasks = localStorage.getItem("allToDo");
    if( allTasks != null ) {
        let data = JSON.parse(allTasks);
        for( let i in data ) {
            displayTask( data[i] );
        }
    }
}

function taskDeleter(task,e) {
    e.currentTarget.remove();
    removeFromStorage(task);
}

input.addEventListener('keypress',addTask.bind(this,false,""));

function addTask(firstLoad,hasTask,e) {
    let task = "";
    if( hasTask == "" ) { task = input.value; } else { tash = hasTask; }
    if( firstLoad || e.key == 'Enter' ) {
        if( task == "" ) {
            alert('Error : Empty Task');
            return;
        }
        if( !firstLoad ) { addToStorage(task); }
        input.value = "";
        displayTask(task);
    }
}

function displayTask(task) {
    let li = document.createElement('li');
    li.innerText = task;
    li.classList.add("task_card");
    li.addEventListener('dblclick',taskDeleter.bind(this,task));
    ul.insertBefore(li, ul.firstChild);
}

function addToStorage(task) {
    let allTasks = localStorage.getItem("allToDo");
    let data = [];
    if( allTasks != null ) { data = JSON.parse(allTasks); }
    data.push(task);
    localStorage.setItem("allToDo", JSON.stringify(data));
}

function removeFromStorage(task) {
    console.log(task);
    let allTasks = localStorage.getItem("allToDo");
    if( allTasks != null ) {
        let data = JSON.parse(allTasks);
        for( let i in data ) {
            if( data[i] == task ) {
                data.splice(i,1);
                localStorage.setItem("allToDo", JSON.stringify(data));
                break;
            }
        }
    }
}