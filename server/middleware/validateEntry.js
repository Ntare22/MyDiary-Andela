import Joi from "joi";

const validateEntry = (req, res, next) => {
    const schema = {
        title: Joi.string().min(3).max(100).required(),
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