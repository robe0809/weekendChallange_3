const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'toDo',
    host: 'localhost',
    port: 5432,
    max: 10,
    idelTimeout: 5000
}

const pool = new Pool(config);

module.exports = pool;