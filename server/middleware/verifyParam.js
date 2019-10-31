import Joi from "joi";

const validateParams = (req, res, next) => {
  try {
    const schema = {
      entryId: Joi.number().required(),
    };
    const result = Joi.validate(req.params, schema);

    if (result.error !== null) {
      return res.status(400).json({
        status: 400,
        error: `${result.error.details[0].message}`
      })
    }
    next();
  }
  catch (error) {
    return res.status(400).json({
      status: 400,
      error: error.message
    })
  }
  
}

export default validateParams;