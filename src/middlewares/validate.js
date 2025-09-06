const validate = (scheme) => {
  return (req, res, next) => {
    const { error, value } = scheme.validate(req.body || {}, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error)
      res.status(400).json({
        errors: error.details.map((err) => {
          return {
            message: err.message,
            field: err.context.key,
          };
        }),
      });
    req.body = value;
    next();
  };
};

export default validate;
