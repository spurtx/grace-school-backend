import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function jwtTokens({user_id, user_name, user_email}) {
    const user = {user_id, user_name, user_email}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '14days'})

    return ({accessToken, refreshToken})
}

export {jwtTokens}