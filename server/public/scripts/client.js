//global variables
let checked;

$(document).ready(onReady);
// event listeners

function onReady () {
    getTask();
    // $('select').hide();
    $('.addTaskBtn').on('click', addTask);
    $('#taskList').on('click', '.close', deleteTasks);
    $('#taskList').on('click', 'li', check);
    $('#taskList').on('click', 'li', completeTasks);
    // $('selected').on('', categorySelected);
}
//posting tasks to server 
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
// getting tasks from server.
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
function check () {
    $(this).toggleClass('checked');
    if($(this).hasClass('checked'))  {
        checked = 'Y';
    } else {
        checked = 'N';
    }
}

function completeTasks () {
    let id = $(this).data('id');
    check;
    $.ajax({
        method: "PUT",
        url: "/tasks/" + id,
        data: {completed: checked},
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

// function categorySelected () {
//     $('selected').hide();
// }