const config = require('./../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./../_config/db');

const Users = db.Users;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    _delete
};

async function authenticate({username, password})
{
    const user = await Users.findOne({username});
    if(user && bcrypt.compareSync(password, user.hash))
    {
        const {hash, ...userWithoutHash} = user.toObject();
        const token = jwt.sign({sub:user.id},config.secret);
        return{
            ...userWithoutHash,
            token
        };
    }
}

async function getAll()
{
    return await Users.find().select('-hash');    
}

async function getById(id)
{
    return await Users.findById(id).select('-hash');
}

async function create(userParam)
{
    if(await Users.findOne({username:userParam.username}))
    {
        throw 'username "' + userParam.username +'" is already taken';
    }

    const user = new Users(userParam);

    if(userParam.password)
    {
        user.hash = bcrypt.hashSync(userParam.password,10);
    }

    await user.save();
}

async function update(id, userParam)
{
    const user = await Users.findById(id);

    if(!user) throw 'User not found';
    if(user.username !== userParam.username && await Users.findOne({username:userParam.username}))
    {
        throw 'username "'+ userParam.username + '" is already taken';
    }

    if(user.password)
    {
        userParam.hash = bcrypt.hashSync(userParam.password,10)
    }
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id)
{
    await Users.findByIdAndRemove(id);
}
