const allConfig = require('./../../config');
const config    = allConfig.database;
const mysql     = require('mysql');

const pool = mysql.createPool({
    host    : config.HOST,
    user    : config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
});

let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('connected error');
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows);
                    }
                    connection.release()
                })
            }
        })
    })
};

let createTable = sql => {
    return query(sql, []);
};

let findDataById = (table, id) => {
    let _sql = 'SELECT * FROM ?? WHERE id = ? ';
    return query(_sql, [table, id, start, end]);
};

let findDataByPage = (table, keys, start, end) => {
    let _sql = 'SELECT ?? FROM ?? LIMIT ? , ?';
    return query(_sql, [keys, table, start, end]);
};

let insertData = (table, values) => {
    let _sql = 'INSERT INTO ?? SET ?';
    return query(_sql, [table, values]);
};

let updateData = (table, values, id) => {
    let _sql = 'UPDATE ?? SET ? WHERE id = ?';
    return query(_sql, [table, id]);
};

let deleteDataById = (table, id) => {
    let _sql = 'DELETE FROM ?? WHERE id = ?';
    return query(_sql, [table, id])
};

let select = (table, keys) => {
    let _sql = 'SELECT ?? FROM ?? ';
    return query(_sql, [keys, table]);
};

let count = table => {
    let _sql = 'SELECT COUNT(*) AS total_count FROM ?? ';
    return query(_sql, [table]);
};

module.exports ={
    query,
    createTable,
    findDataById,
    findDataByPage,
    deleteDataById,
    insertData,
    updateData,
    select,
    count
};