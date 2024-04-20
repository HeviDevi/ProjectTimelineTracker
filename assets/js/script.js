// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

let allProjects = JSON.parse(localStorage.getItem('projects')) || [];
let todoCardsElement = document.getElementById('todo-cards');
let inProgressCardsElement = document.getElementById('in-progress-cards');
let doneCardsElement = document.getElementById('done-cards')
let createProjectButton = document.getElementById('create-project');
let deleteProjectButton = document.getElementsByClassName('deletable');
let pinProject;
let today = dayjs();
let projecteDueDate = dayjs($('#datepicker').datepicker('getDate'));


function colorChanger(today,projecteDueDate,pinProject,done,draggedProject){
    let untilDue = projecteDueDate.diff(today, 'days');
    
    if(done || draggedProject.status === 'done'){
        pinProject.style.backgroundColor = 'green';

    } else if (untilDue <= 3 && untilDue >= 0 && !done && draggedProject.status !== 'done') {
      pinProject.style.backgroundColor = 'yellow';
    
    
    } else if (untilDue < 0 && !done && draggedProject.status !== 'done') {
        pinProject.style.backgroundColor = 'red';

    } else if (untilDue > 3 && !done && draggedProject.status !== 'done'){
       pinProject.style.backgroundColor = 'blue';
    }
    };

function handleAddTask(event){
event.preventDefault();
    let title = document.getElementById("project-name").value;
    let dueDate = document.getElementById("datepicker").value;
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
        status:'todo',
}
//push the object into an array of objects
allProjects.push(newProject);

//Save them to local storage using javaScript object notation
localStorage.setItem('projects', JSON.stringify(allProjects));


location.reload()
}


// Todo: create a function to render the task list and make cards draggable

function renderTaskList() {
            allProjects.forEach(newProject => {
    
                let pinProject = document.createElement('article');
    
                        pinProject.setAttribute('id', newProject.title );
                        pinProject.classList.add('draggable');
    
                pinProject.innerHTML = `
                <h2>${newProject.title}</h2>
                <h4> Due By: ${newProject.dueDate}</h4>
                <p>${newProject.description}</p>
                <button type="button" id='deletable' class='deletable' 'btn-danger-subtle'> Delete </button>
            `
            let projecteDueDate = dayjs(newProject.dueDate);
            let done = newProject.status === 'done'
            sortProjects(pinProject,newProject)
            colorChanger(today,projecteDueDate,pinProject,done,newProject)
            });
            
}

function sortProjects(pinProject, newProject){

/// Sorts by object status
    if (newProject.status === 'todo'){
        todoCardsElement.appendChild(pinProject)
    } else if(newProject.status === 'in-progress'){
        inProgressCardsElement.appendChild(pinProject)
    } else if(newProject.status === 'done'){
        doneCardsElement.appendChild(pinProject)
    }

}

function handleDeleteTask(){
    
            this.parentElement.remove();
    
            let deleteById = this.parentElement.id; 

            allProjects = allProjects.filter(project=> project.title !== deleteById);
            localStorage.setItem('projects', JSON.stringify(allProjects));
    }

function handleDrop(event, ui, allProjects, pinProject) {
                 
                let dragId = ui.draggable.attr('id');
                let draggedProject = allProjects.find(project => project.title === dragId)
                if (!draggedProject) {
                    return;
                }
                if(event.target.classList.contains('in-progress-cards')){
                  
                        if(draggedProject && draggedProject.status !== 'in-progress'){
                            draggedProject.status = 'in-progress'
                        }
                           
                } else if (event.target.classList.contains('done-cards')){
                   
                        if(draggedProject && draggedProject.status !== 'done'){
                            draggedProject.status = 'done'
                        }


                } else if(event.target.classList.contains('todo-cards')){
                   
                        if(draggedProject && draggedProject.status !== 'todo')
                            draggedProject.status = 'todo'
                     }
                
                

            localStorage.setItem('projects', JSON.stringify(allProjects));
            let projecteDueDate = dayjs($('#datepicker').datepicker('getDate'));
            let done = event.target.classList.contains('done-cards')

           colorChanger(today,projecteDueDate,pinProject,done,draggedProject)
          
}

$(document).ready(function () {

    //Render tasks from local storage and sort tem into appropriate coloumns 
    renderTaskList()
 
    //Add the Delete function to each button element
    Array.from(deleteProjectButton).forEach(button => {
        button.addEventListener('click', handleDeleteTask)
    });
    
    //Create Project event listener
    createProjectButton.addEventListener('click',handleAddTask)
    
    
    // Jquery drag and drop triggers
    $('.draggable').draggable();
    
    $('.todo-cards').droppable({
        drop: function(event,ui){
            handleDrop(event, ui, allProjects, ui.draggable[0])
        }
        });
        
    $('.in-progress-cards').droppable({
        drop: function(event,ui){
            handleDrop(event, ui, allProjects, ui.draggable[0])
        }
        });
        
    $('.done-cards').droppable({
        drop: function(event, ui){
            handleDrop(event, ui, allProjects, ui.draggable[0])
        }
        });
    });

    //Jquery datepicker script
    $( function() {
        $( "#datepicker" ).datepicker({
            showButtonPanel:true,
            changeMonth:true,
            minDate: new Date(2024,0,1),
            maxDate: new Date(2024,11,31),
        });
      } );
