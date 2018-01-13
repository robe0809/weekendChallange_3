//global variables
let checked;

$(document).ready(onReady);
// event listeners

function onReady () {
    getTask();
    $('.addTaskBtn').on('click', addTask);
    $('#taskList').on('click', '.close', deleteTasks);
    $('#taskList').on('click', 'li', check);
    $('#taskList').on('click', 'li', completeTasks);
}

function addTask () {
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

function getTask () {
    console.log('addTask clicked');
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
// separate function for appending tasks to the DOM
function appendTasks (taskArray) {
    for(let i = 0; i < taskArray.length; i++) {
        let $row = $('<li data-id="' + taskArray[i].id + '"><span class="close">-</span></li>');
        $row.append(taskArray[i].description);
        $('#taskList').prepend($row);
    }
}
// this toggles a class to li when clicked and
// sends a Y or a N;
function check () {
    $(this).toggleClass('checked');
    if($(this).hasClass('checked'))  {
        checked = 'Y';
    } else {
        checked = 'N';
    }
    console.log(checked);
}

// sends updated information to server/database.
function completeTasks () {
    let id = $(this).data('id');
    check;// call the check function here to update the database.
    $.ajax({
        method: "PUT",
        url: "/tasks/" + id,
        data: {taskFinished: checked},
        success: function (response) {
            console.log('successful PUT response: ', response);
        }
    });
}

function deleteTasks() {
    let id = $(this).parent().data('id');
    $.ajax({
        method: "DELETE",
        url:'/tasks/' + id,
        success: function (response) {
            console.log('successful delete: ', response);
            getTask();
        }
    });
}
