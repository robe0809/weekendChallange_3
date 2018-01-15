//global variables
let checked;

$(document).ready(onReady);
// event listeners

function onReady () {
    getTask();
    $('.addTaskBtn').on('click', addTask);
    $('#taskList').on('click', '.close', deleteTasks);
    $('#taskList').on('click', '.finished', completed);   
    $('#taskList').on('click', '.finished', updateCompleted);    
}

// adds task to the DOM and database;
function addTask () {
    // if there are completed tasks in the list this will 
    // alert the user to delete the completed items first before adding a new task.
    if($('li').hasClass('checked')) {
        alert('Please delete completed tasks before adding a new one.');
    } 
    else {
        // object to send to server
        const newTask = {
            description: $('#toDoIn').val()
        }
        $.ajax({
            method: "POST",
            url:'/tasks',
            data: newTask,
            success: function (response) {
                console.log('successful addTask POST: ', response );
                getTask();
                $('#toDoIn').val('');
            }
        });
    }
}

// this gets and appends all new tasks that have not been completed.
function getTask () {
    $.ajax({
        method: "GET",
        url: '/tasks',
        success: function (response) {
            console.log('successful getTask: ', response);
            $('#taskList').empty();
            appendTasks(response); // call append tasks and send in an array "response";
        }   
    });
}

// separate function for appending uncompleted tasks to the DOM
function appendTasks (taskArray) {
    for(let i = 0; i < taskArray.length; i++) {
        let $row = $('<li data-id="' + taskArray[i].id + '"><span class="finished">&#10003</span><span class="close">-</span></li>');
        $row.append(taskArray[i].description);
        $('#taskList').prepend($row);
    }
}
// Checks to see whether or not a task has been completed and sends
// a get request to get all tasks that have NOT BEEN COMPLETED.
function completed () {
    $(this).parent().toggleClass('checked');
    if($(this).parent().hasClass('checked')){
        checked = 'Y';
    } else {
        checked = 'N';
    }
    $.ajax({
        method: "GET",
        url: "/tasks/completed",
        success: function (response) {
            console.log('successful completed GET ', response);
        }
    })
}

// Updates the DATABASE on whether tasks have been completed or not. 
function updateCompleted () {
    let id = $(this).parent().data('id');
    $.ajax({
        method: "PUT",
        url: '/tasks/' + id,
        data: {taskFinished: checked},
        success: function (response) {
            console.log('successful PUT', response);
        }
    })
}

// DELETES all tasks from the DOM and Database.
function deleteTasks() {
    let id = $(this).parent().data('id');
    $(this).parent().remove();
    $.ajax({
        method: "DELETE",
        url:'/tasks/' + id,
        success: function (response) {
            console.log('successful delete: ', response);
        }
    });
}
