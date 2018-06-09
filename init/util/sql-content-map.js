const fs     = require('fs');
const sqlMap = require('./sql-map');

let sqlContentMap = {};

function sqlContent(fileName, path) {
    let content   = fs.readFileSync(path, 'binary');
    sqlContentMap[fileName] = content;
}

function getSqlContentMap() {
    let _sqlMap = sqlMap();
    for (let key in _sqlMap) {
        sqlContent(key, _sqlMap[key]);
    }
    return sqlContentMap
}

module.exports = getSqlContentMap;