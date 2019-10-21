import Joi from "joi";

const validateEntry = (req, res, next) => {
    const schema = {
        title: Joi.string().max(20).required(),
        description: Joi.string().required(),
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

export default validateEntry;