const mysql    = require('mysql');
const config   = require('./../../config');
const dbConfig = config.database;

const pool = mysql.createPool({
    host    : dbConfig.HOST,
    user    : dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
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
                        console.log(err);
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

module.exports = {
    query
};