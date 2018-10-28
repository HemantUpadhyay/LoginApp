const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../controller/user.service');

function jwt()
{
    const secret = config.secret;
    return expressJwt({secret, isRevoked}).unless({
        path:[
            '/controller/authenticate',
            '/controller/register'
        ]
    });
}

async function isRevoked(req, payload, done)
{
    const user = await userService.getById(payload.sub);
    if(!user){
        return done(null,true);
    }

    done()
}

module.exports = jwt;