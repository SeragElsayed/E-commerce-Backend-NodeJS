const jwt = require('jsonwebtoken');
const util = require('util')
const signToken = util.promisify(jwt.sign)
const verfyToken = util.promisify(jwt.verify)

const tokenSecret = "token secret"

function verify(token){
    return verfyToken(token,tokenSecret)
}
function sign(userId){
    return signToken({userId},tokenSecret)
}

module.exports={
    verify,
    sign,
}