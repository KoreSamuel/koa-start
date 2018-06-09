const fs   = require('fs');
const walk = require('./walk');

function sqlMap() {
    let basePath = __dirname;
        basePath = basePath.replace(/\\/g, '\/');

    let pathArr  = basePath.split('\/');
        pathArr  = pathArr.splice(0, pathArr.length - 1);
        basePath = pathArr.join('/') + '/sql/';

    let fileList = walk(basePath, 'sql');
    return fileList;
}

module.exports = sqlMap;