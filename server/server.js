const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

const toDo = require('./router/todolist.router');
//routes

app.use('/tasks', toDo);

// listening for port
app.listen(port, function () {
    console.log('Server is up on port: ', port);
})
