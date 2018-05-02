const AccountActions = require('../actions/Account');
const {sendSuccess, sendError} = require('../helpers/response');
const isEmail = require('validator/lib/isEmail');


exports.forgetPassword = (req, res) => {
    const defaultArgs = {
        email: ''
    };

    const {email} = Object.assign({}, defaultArgs, req.body);

    if (!email || !isEmail(email)) {
        return res.send({
            success: false,
            message: 'Your email address is invalid.'
        });
    }

    AccountActions.forgetPassword({email})
        .then(sendSuccess(req, res))
        .catch(sendError(req, res));
};