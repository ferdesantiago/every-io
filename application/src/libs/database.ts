import mysql from 'mysql2';

const pool = mysql.createPool({host:'localhost', user: 'root', password: 'root', database: 'every_io'});
const promisePool = pool.promise();

export {
    promisePool
}