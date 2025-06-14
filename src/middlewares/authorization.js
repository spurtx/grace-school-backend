import jwt from 'jsonwebtoken'

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; //Bearer Token

    const token = authHeader && authHeader.split(' ')[1]; //Token

    if (token == null) return res.status(401).json({error: "Null token"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({error: error.message})
        req.user = user; // Attach the user to the request object
        next(); // Call the next middleware
    } )
}

export {authenticateToken}