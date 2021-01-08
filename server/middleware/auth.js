const jwt = require ("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        // console.log (`Our token is: ${token}`);

        if (!token) 
            return res
                .status(401)
                .json({msg: "No Authenticated Token, Access Denied"});
        
        const verified = jwt.verify(token,  process.env.JWT_SECRET);
        if (!verified) 
            return res
                .status(401)
                .json({msg: "Token Verification Failed, Access Denied."});
        
        // console.log (`Verified is: ${verified}`);
        req.user = verified.id;
        next();

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = auth;
