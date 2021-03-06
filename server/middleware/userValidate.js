import Joi from "joi";

const validateUser = (req, res, next) => {
    try {
        const schema = {
            firstName: Joi.string().regex(/^[a-zA-Z\s\S]+$/).max(20).required(),
            lastName: Joi.string().regex(/^[a-zA-Z\s\S ]+$/).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]+$/).min(8).max(15).required()
        };
        const result = Joi.validate(req.body, schema);

        if (result.error !== null) {
            return res.status(400).send({
                status: 400,
                error: `${result.error.details[0].message}`
            })
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            error: error.message
        })
    }
    
}

export default validateUser;