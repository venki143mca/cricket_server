const jwt = require('jwt-simple');
const moment = require('moment');

function isAuthenticated(req, res, next) {
    console.log("Middleware::Authentication");
    const token = req.headers['x-access-token'];
    if(!token) {
        res.send('Access token has expired.', 401);
    }
    const decoded = jwt.decode(token, "YOUR_SECRET_STRING");
    const d = Date.now();
    if (decoded.exp <= d) {
        res.send('Access token has expired.', 401);
    }
    next();
}

function generateToken(user) {
    const expires = moment().add(1, 'hours').valueOf();
    console.log(user);

    var token = jwt.encode({
        iss: user.userName,
        exp: expires
    }, "YOUR_SECRET_STRING");

    return {
        token: token,
        expires: expires
    }
}

function invalidateToken() {
//     Create a token blacklist

// You could store the invalid tokens until their initial expiry date, and compare them against incoming requests. 
// This seems to negate the reason for going fully token based in the first place though, 
// as you would need to touch the database for every request. The storage size would likely be lower though, 
// as you would only need to store tokens that were between logout & expiry time (this is a gut feeling, 
// and is definitely dependent on context).
}
module.exports = {
    isAuthenticated,
    generateToken
}