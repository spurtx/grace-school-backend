import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

const validateUser = (req, res, next) => {
    const {error} = userSchema.validate(req.body)

    if(error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        })
    }
    next()
}

export default validateUser