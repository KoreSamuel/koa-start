const validator = require('validator');
const userModel = require('./../models/user');
const userCode  = require('./../codes/constant');

const user = {
    /**
     *创建用户
     *
     * @param {*} user
     * @returns
     */
    async create(user) {
        let result = await userModel.create(user);
        return result;
    },
    /**
     * 查找存在用户信息
     *
     * @param {*} formData
     * @returns
     */
    async getExistOne(formData) {
        let result = await userModel.getExistOne({
            'email': formData.email,
            'name' : formData.name
        });
        return result
    },
    /**
     * 登录
     *
     * @param {*} formData
     * @returns
     */
    async signIn(formData) {
        let result = await userModel.getOneByUserNameAndPassword({
            'password': formData.password,
            'name': formData.userName
        });
        return result
    },
    /**
     * 用户名查找
     *
     * @param {*} userName
     * @returns
     */
    async getUserInfoByUserName(userName) {
        let result = await userModel.getUserInfoByUserName(userName) || {};
        return {
            email:result.email,
            userName: result.name,
            detailInfo: result.detail_info,
            createTime: result.create_time
        };
    },
    /**
     * 用户数据校验
     * @param {*} userInfo
     */
    validatorSignUp(userInfo) {
        let result = {
            success: false,
            message: ''
        };
        // 字母数字下划线短线组合，6-16位
        if (!/[a-z0-9\_|-]{6,16}/.test(userInfo.userName)) {
            result.message = userCode.ERROR_USER_NAME;
            return result;
        }
        if (!validator.isEmail(userInfo.email)) {
            result.message = userCode.ERROR_EMAIL;
            return result;
        }
        if (!/[\w+]{6,16}/.test(userInfo.password)) {
            result.message = userCode.ERROR_PASSWORD;
            return result;
        }
        if (userInfo.password !== userInfo.confirmPassword) {
            result.message = userCode.ERROR_PASSWORD_CONFORM;
            return result;
        }

        result.success = true;
        return result;
    }
};

module.exports = user;