const dbUtils = require('./../utils/db-util');

const user = {
    /**
     * 数据库创建用户
     * @param {*} model
     */
    async create(model) {
        let result = await dbUtils.insertData('user', model);
        return result
    },
    /**
     * 查找一个存在用户数据
     * @param {*} options
     */
    async getExistOne(options) {
        let _sql = `
            SELECT * FROM user
            WHERE email = "${options.email}" or name = "${options.name}"
            LIMIT 1
        `;
        let result = await dbUtils.query(_sql);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null
        }
        return result;
    },
    /**
     * 根据用户名和密码查找用户
     *
     * @param {*} options
     * @returns
     */
    async getOneByUserNameAndPassword(options) {
        let _sql = `
            SELECT * FROM user
            WHERE name = "${options.name}" and password = "${options.password}"
            LIMIT 1
        `;
        let result = await dbUtils.query(_sql);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null;
        }
        return result;
    },
    /**
     *根据用户名查找用户信息
     *
     * @param {*} userName
     * @returns
     */
    async getUserInfoByUserName(userName) {
        let result = dbUtils.select(
            'user',
            ['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'level']
        );
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null
        }
        return result
    },


};
module.exports = user;