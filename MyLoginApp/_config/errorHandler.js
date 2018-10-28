var errorHandler = function(err, req, res, next){
    if(typeof(err) === 'string')
    {
        //custom application error
        return res.status(400).json({message : err});
    }

    if(typeof(err) == 'ValidationError')
    {
        //mongoose validation error
        return res.status(400).json({message : err.message});
    }

    if(typeof(err) === 'UnauthorizedError')
    {
        //jwt unauthentication error
        return res.status(401).json({message : 'Invalid Token'});
    }
    //default to 500 server error
    return res.status(500).json({message : err.message});
}

module.exports = errorHandler;