const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


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
// getting all data from tasks table in database
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
// if all tasks are seen as complete and then we refreshed the page
// the database still sees them as complete. So when I mark the tasks
// as complete again the database does not change until I mark them all complete
// then uncomplete which will start the database back to it's original state
router.put('/:id', (req, res) => {
    const queryText =  `UPDATE tasks SET complete = $1 WHERE id = $2;`
    pool.query(queryText, [req.body.completed, req.params.id])
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