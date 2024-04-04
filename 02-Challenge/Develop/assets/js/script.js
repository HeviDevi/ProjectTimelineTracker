// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

let allProjects = JSON.parse(localStorage.getItem('projects')) || [];
let todoCardsElement = document.getElementById('todo-cards');
let createProjectButton = document.getElementById('create-project');
let deleteProjectButton = document.getElementsByClassName('deletable');

// Todo: create a function to generate a unique task id

function generateTaskId() {

}

// // Todo: create a function to create a task card

function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable

function renderTaskList() {
            allProjects.forEach(newProject => {
    
                let pinProject = document.createElement('article');
    
                        pinProject.setAttribute('id', newProject.title );
                        pinProject.classList.add('project-card', 'draggable');
    
                pinProject.innerHTML = `
                <h2> Project Title: ${newProject.title}</h2>
                <h4> Due By: ${newProject.dueDate}</h4>
                <p>${newProject.description}</p>
                <button id='deletable' class='deletable'> Delete </button>
            `
            todoCardsElement.appendChild(pinProject);
            });
}

// Todo: create a function to handle adding a new task

function handleAddTask(event){

                let title = document.getElementById("project-name").value;
                let dueDate = document.getElementById("due-date-text").value;
                let description = document.getElementById("description-text").value;

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
//Package harvested variables into an object and set the completion status
                let newProject = {
                    title:title,
                    dueDate:dueDate,
                    description:description,
                    status:"todo",
}
//push the object into an array of objects
        allProjects.push(newProject);

//Save them to local storage using javaScript object notation
        localStorage.setItem('projects', JSON.stringify(allProjects));

//Clear the Modal
            document.getElementById("project-name").value ="";
            document.getElementById("due-date-text").value ="";
            document.getElementById("description-text").value = "";

// const modal = document.getElementById('formModal');
// modal.style.display = 'none';

}

// Todo: create a function to handle deleting a task

function handleDeleteTask(){
    
            this.parentElement.remove();
    
            let deleteById = this.parentElement.id; 

            allProjects = allProjects.filter(project=> project.title !== deleteById);
            localStorage.setItem('projects', JSON.stringify(allProjects));
    }


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
                //What section we are in 
                console.log('section', event.target)
                //What Item was dropped 
                console.log('dropped', ui.draggable)
                //Update the status property of the object
                //Update local storage with new object properties
                
                // if (event.target.classList.contains('in-progress-cards')){
                    
                // }

}

$(document).ready(function () {


    renderTaskList()
    
    Array.from(deleteProjectButton).forEach(button => {
        button.addEventListener('click', handleDeleteTask)
    });
    
    
    createProjectButton.addEventListener('click',handleAddTask)
    
    
    
    $('.draggable').draggable();
    
    $('.todo-cards').droppable({  
        drop:handleDrop  
        });
        
    $('.in-progress-cards').droppable({
        drop:handleDrop
        });
        
    $('.done-cards').droppable({
        drop:handleDrop
        });
    });
    