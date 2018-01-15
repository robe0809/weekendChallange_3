const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// Post to /tasks
router.post('/', (req, res) => {
    console.log(req.body, req.res);
    const queryText = `INSERT INTO tasks (description) VALUES($1)`
    pool.query(queryText, [req.body.description])
        .then((result) => {
            console.log('posts result: ', result);
            res.send(201);
        })
        .catch((err) => {
            console.log('queryText post error: ', err);
            res.sendStatus(500);
        })
})
// GET all data from tasks table in database
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM tasks;`
    pool.query(queryText)
        .then((result) => {
            console.log('this is query result: ', result.rows);
            res.send(result.rows); 
        })
        .catch((err) => {
            console.log('queryText error: ', err);
            res.sendStatus(500);
        })
});

// GETS all completed tasks from Database
router.get('/completed', (req, res) => {
    const queryText = `SELECT * FROM tasks WHERE complete='N';`
    pool.query(queryText)
        .then((result) => {
            console.log('this is completed query result: ', result.rows);
            res.send(result.rows); 
        })
        .catch((err) => {
            console.log('queryText error: ', err);
            res.sendStatus(500);
        })
})

// DELETES tasks from database
router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM tasks WHERE id=$1`
    pool.query(queryText, [req.params.id])
    .then((result) => {
        console.log('this is query DELETE result: ', result);
        res.sendStatus(200); 
    })
    .catch((err) => {
        console.log('queryText DELETE error: ', err);
        res.sendStatus(500);
    })
})
// If all of the tasks are marked as complete then we refresh the page,
// the DOM displays the uncomplete tasks but the database still sees them as complete. 
// So when I mark the tasks as complete again, the database does not see this change 
// because it assumes they are already complete. I did not figure out a solution to this. 
router.put('/:id', (req, res) => {
    const queryText =  `UPDATE tasks SET complete = $1 WHERE id = $2;`
    pool.query(queryText, [req.body.taskFinished, req.params.id])
    .then((result) => {
        console.log('put result: ', result);
        res.send(201);
    })
    .catch((err) => {
        console.log('queryText put error: ', err);
        res.sendStatus(500);
    });
});

module.exports = router;