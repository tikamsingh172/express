const ErrorHandler = require("../errors/ErrorHandler");

function apiKey(req, res, next) {
    const api_Key = '12345678';
    const user_api_Key = req.query.api_key;
    console.log('user_api_Key:', user_api_Key);

    if (user_api_Key && user_api_Key === api_Key) {
        next();
    } else {
        // res.json({ message: "Not Allowed!" });

        next(ErrorHandler.forbidden('api key is not valid !'));
    }
}

module.exports = apiKey;