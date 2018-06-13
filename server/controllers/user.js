const userInfoService = require('./../services/user');
const userCode = require('./../codes/constant');

module.exports = {
    /**
     * 登录
     * @param {*} ctx
     */
    async signIn(ctx) {
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        };
        let userResult = await userInfoService.signIn(formData);

        if (userResult) {
            if (formData.userName === userResult.name) {
                result.success = true;
            } else {
                result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR,
                result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR';
            }
        } else {
            result.code = 'FAIL_USER_NO_EXIST';
            result.message = userCode.FAIL_USER_NO_EXIST;
        }

        if (formData.source === 'form' && userResult.success) {
            let session = ctx.session;
            session.isLogin = true;
            session.userName = userResult.name;
            session.userId = userResult.id;

            ctx.redirect('/work');
        } else {
            ctx.body = result;
        }
    },

    async signUp(ctx) {
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            data: null
        };

        let validateResult = userInfoService.validatorSignUp(formData);

        if (!validateResult.success) {
            result = validateResult;
            ctx.body = result;
            return ;
        }

        let existOne = await userInfoService.getExistOne(formData);


        if (existOne) {
            if (existOne.name === formData.userName) {
                result.message = userCode.FAIL_USER_NAME_IS_EXIST;
                ctx.body = result;
                return ;
            }
            if (existOne.email === formData.email) {
                result.message = userCode.FAIL_EMAIL_IS_EXIST;
                ctx.body = result;
                return;
            }
        }

        let userResult = await userInfoService.create({
            email: formData.email,
            password: formData.password,
            name: formData.userName,
            create_time: new Date().getTime(),
            level: 1
        });

        if (userResult && +userResult.insertId > 0) {
            result.success = true;
        } else {
            result.message = userCode.ERROR_SYS;
        }

        ctx.body = result;
    },

    async getLoginUserInfo(ctx) {
        let session = ctx.session;
        let isLogin = session.isLogin;
        let userName = session.userName;

        let result = {
            success: false,
            message: '',
            data: null
        };
        if (isLogin && userName) {
            let userInfo = await userInfoService.getUserInfoByUserName(userName);
            if (userInfo) {
                result.data = userInfo;
                result.success = true;
            } else {
                result.message = userCode.FAIL_USER_NO_LOGIN;
            }
        } else {
            // todo
        }

        ctx.body = result;
    },

    validateLogin(ctx) {
        let reuslt = {
            success: false,
            message: userCode.FAIL_USER_NO_LOGIN,
            data: null,
            code: 'FAIL_USER_NO_LOGIN'
        };
        let session = ctx.session;
        if (session && session.isLogin) {
            result.message = '';
            result.success = true;
            result.code = '';
        }
        return result;
    }
}