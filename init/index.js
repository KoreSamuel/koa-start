const fs               = require('fs');
const getSqlContentMap = require('./util/sql-content-map');
const {query}          = require('./util/db');

const eventLog = (err, sqlFile, index) => {
    if (err) {
        console.log('[ERROR] sql file' + sqlFile + 'No.' + (index + 1) + 'failed.');
    } else {
        console.log('[SUCCESS] sql file '+ sqlFile + 'No.' + (index + 1) + 'successed.')
    }
}

let sqlContentMap = getSqlContentMap();

// create table
const createAllTable = async () => {
    for (let key in sqlContentMap) {
        let sqlShell = sqlContentMap[key];
        let sqlShellList = sqlShell.split(';');

        for (let [i, shell] of sqlShellList.entries()) {
            if (shell.trim()) {
                let result = await query(shell);
                if (+result.serverStatus === 2) {
                    eventLog(null, key, i)
                } else {
                    eventLog(true, key, i)
                }
            }
        }
    }

    console.log('sql excute over.');
    console.log('ctrl + c to exit');
}

createAllTable();