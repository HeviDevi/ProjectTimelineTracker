// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const createProjectButton = document.getElementById('create-project');

createProjectButton.addEventListener('click',function(){

const title = document.getElementById("project-name").value;
const dueDate = document.getElementById("due-date-text").value;
const description = document.getElementById("description-text").value;

if(title === ""){
    window.alert("No Project Title Added")
    return
}
if(dueDate === ""){
    window.alert("No Due Date Added")
    return
}
if(description === ""){
    window.alert("No Project Description Added")
    return
}

let newProject = {
    title:title,
    dueDate:dueDate,
    description:description,
}
const allProjects = JSON.parse(localStorage.getItem('projects')) || [];
allProjects.push(newProject);
localStorage.setItem('projects', JSON.stringify(allProjects));

document.getElementById("project-name").value ="";
            document.getElementById("due-date-text").value ="";
            document.getElementById("description-text").value = "";

const modal = document.getElementById('formModal');
modal.style.display = 'none';

})


// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
